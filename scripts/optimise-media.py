#!/usr/bin/env python3
"""Re-encode site media for web delivery.

Sizes are chosen from how each asset is actually displayed:

    card thumbnail   368 px wide (3-column grid)
    lead media      ~530 px wide (46% right column)
    hero portrait    260 px wide (110 px on mobile)
    gallery thumb    110 px, but opens in a lightbox at up to 90vw

Targets are roughly 2x the largest CSS size so they stay sharp on retina
displays, and no larger.

    python3 scripts/optimise-media.py --dry-run
    python3 scripts/optimise-media.py

Originals are all tracked in git; restore any file with
`git checkout -- <path>`.
"""

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent

# width, jpeg quality — keyed by role
HERO = 800
CARD = 1400
GALLERY = 1600

IMAGES = [
    ("AboutMe/imagesarp.JPEG", HERO),
    ("BloomingRose/BloomingRose.png", CARD),
    ("IsaacGameBox/FourSoulsBoxRender.png", CARD),
    ("IsaacGameBox/FourSoulsSetup.png", GALLERY),
    ("IsaacGameBox/FourSoulsClosed.png", GALLERY),
    ("IsaacGameBox/IsaacBox1.JPEG", GALLERY),
    ("IsaacGameBox/Isaacbox2.JPEG", GALLERY),
    ("IsaacGameBox/IsaacBox3.JPEG", GALLERY),
    ("DeskLamp/DeskLampRender.png", CARD),
    ("DeskLamp/DeskLamp2.JPEG", GALLERY),
    ("MicroRosBot/RobotImage.JPEG", GALLERY),
    ("MicroRosBot/CADModel.png", GALLERY),
    ("ModeAnalysis/FRF.png", GALLERY),
    ("ModeAnalysis/Modes.png", GALLERY),
    ("WindTurbine/WindTurbine.png", CARD),
    ("OtherDesigns/MiniFan.png", CARD),
    ("OtherDesigns/SnowboardHanger_Mountain.png", CARD),
    ("OtherDesigns/Snowboard Hanger Waves.png", CARD),
]

# PNGs with real transparency that are far too large: convert to WebP,
# which keeps the alpha channel at a fraction of the size.
TO_WEBP = [("MIDIBOT/MIDIBOT.png", CARD)]

# (source, destination, max width, crf) — destination differs from source
# only when the container or codec has to change.
VIDEOS = [
    # HEVC in .MOV: Chrome and Firefox cannot decode this. Re-encode to H.264.
    ("BloomingRose/BloomingRose.MOV", "BloomingRose/BloomingRose.mp4", 1280, 26),
    ("RotaryInvertedPendulum/InvPendulum.MOV", "RotaryInvertedPendulum/InvPendulum.mp4", 1280, 26),
    # already H.264, just over-encoded for their display size
    ("DeskLamp/MainVideo.mp4", None, 1280, 26),
    ("TunedMassDampener/ProjectDemonstration.mp4", None, 1280, 26),
    ("MicroRosBot/Operation_Video.mp4", None, 800, 28),
    ("WindTurbine/MainVideo.mp4", None, 720, 26),
    ("ModeAnalysis/MainVideo.mp4", None, 720, 26),
]

# videos that have no poster frame, so the card shows an empty box until the
# video downloads: grab frame at the given timestamp
POSTERS = [
    ("RotaryInvertedPendulum/InvPendulum.mp4", "RotaryInvertedPendulum/InvPendulum.jpg", "00:00:02"),
    ("TunedMassDampener/ProjectDemonstration.mp4", "TunedMassDampener/ProjectDemonstration.jpg", "00:00:01"),
    ("ModeAnalysis/MainVideo.mp4", "ModeAnalysis/MainVideo.jpg", "00:00:01"),
]


def mb(n: int) -> str:
    return f"{n / 1048576:7.2f} MB"


def run(cmd: list) -> None:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise SystemExit(f"command failed: {' '.join(cmd)}\n{result.stderr[-2000:]}")


def resize(im: Image.Image, max_w: int) -> Image.Image:
    # Phone photos carry their rotation in an EXIF tag rather than in the pixel
    # data. Re-saving drops that tag, so bake the rotation in first or the image
    # comes out sideways.
    im = ImageOps.exif_transpose(im)
    if im.width <= max_w:
        return im
    h = round(im.height * max_w / im.width)
    return im.resize((max_w, h), Image.LANCZOS)


def do_image(rel: str, max_w: int, dry: bool) -> tuple:
    src = ROOT / rel
    before = src.stat().st_size
    im = Image.open(src)
    out = resize(im, max_w)
    if dry:
        return before, before, f"{im.size} -> {out.size}"

    tmp = src.with_suffix(src.suffix + ".tmp")
    if src.suffix.lower() in (".jpeg", ".jpg"):
        out.convert("RGB").save(tmp, "JPEG", quality=82, optimize=True, progressive=True)
    else:
        out.save(tmp, "PNG", optimize=True)
    tmp.replace(src)
    return before, src.stat().st_size, f"{im.size} -> {out.size}"


def do_webp(rel: str, max_w: int, dry: bool) -> tuple:
    src = ROOT / rel
    dst = src.with_suffix(".webp")
    before = src.stat().st_size
    im = Image.open(src)
    out = resize(im, max_w)
    if dry:
        return before, before, f"{im.size} -> {out.size} => {dst.name}"
    out.save(dst, "WEBP", quality=86, method=6)
    src.unlink()
    return before, dst.stat().st_size, f"{im.size} -> {out.size} => {dst.name}"


def do_video(src_rel: str, dst_rel, max_w: int, crf: int, dry: bool) -> tuple:
    src = ROOT / src_rel
    before = src.stat().st_size
    in_place = dst_rel is None
    dst = src if in_place else ROOT / dst_rel
    if dry:
        return before, before, f"w<={max_w} crf{crf}{'' if in_place else ' => ' + Path(dst_rel).name}"

    tmp = dst.with_suffix(".tmp.mp4")
    run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
        "-vf", f"scale='min({max_w},iw)':-2:flags=lanczos",
        "-c:v", "libx264", "-crf", str(crf), "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-an",                      # every video is muted autoplay; drop audio
        "-movflags", "+faststart",  # moov atom first, so playback starts early
        str(tmp),
    ])
    tmp.replace(dst)
    if not in_place:
        src.unlink()
    return before, dst.stat().st_size, f"w<={max_w} crf{crf}"


def do_poster(video_rel: str, poster_rel: str, ts: str, dry: bool) -> tuple:
    video = ROOT / video_rel
    poster = ROOT / poster_rel
    if not video.exists():
        return 0, 0, "SKIPPED (video missing)"
    if dry:
        return 0, 0, f"frame @ {ts}"
    run([
        "ffmpeg", "-y", "-loglevel", "error", "-ss", ts, "-i", str(video),
        "-frames:v", "1", "-vf", f"scale='min({CARD},iw)':-2",
        "-q:v", "4", str(poster),
    ])
    return 0, poster.stat().st_size, f"frame @ {ts}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    dry = args.dry_run

    total_before = total_after = 0

    print("IMAGES")
    for rel, w in IMAGES:
        if not (ROOT / rel).exists():
            print(f"  skip (missing)          {rel}")
            continue
        b, a, note = do_image(rel, w, dry)
        total_before += b
        total_after += a
        print(f"  {mb(b)} -> {mb(a)}  {rel}   {note}")

    print("\nPNG WITH ALPHA -> WEBP")
    for rel, w in TO_WEBP:
        if not (ROOT / rel).exists():
            print(f"  skip (missing)          {rel}")
            continue
        b, a, note = do_webp(rel, w, dry)
        total_before += b
        total_after += a
        print(f"  {mb(b)} -> {mb(a)}  {rel}   {note}")

    print("\nVIDEOS")
    for src_rel, dst_rel, w, crf in VIDEOS:
        if not (ROOT / src_rel).exists():
            print(f"  skip (missing)          {src_rel}")
            continue
        b, a, note = do_video(src_rel, dst_rel, w, crf, dry)
        total_before += b
        total_after += a
        print(f"  {mb(b)} -> {mb(a)}  {src_rel}   {note}")

    print("\nGENERATED POSTERS")
    for v, p, ts in POSTERS:
        b, a, note = do_poster(v, p, ts, dry)
        total_after += a
        print(f"  {'':>10}    {mb(a)}  {p}   {note}")

    saved = total_before - total_after
    print(f"\nTOTAL {mb(total_before)} -> {mb(total_after)}"
          f"   saved {mb(saved)}"
          f" ({100 * saved / total_before:.0f}%)" if total_before else "")
    if dry:
        print("\n(dry run, nothing written)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
