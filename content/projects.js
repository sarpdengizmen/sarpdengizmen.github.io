/* =============================================================================
   PROJECT CONTENT — the single place to edit project copy.

   Every project's text lives in one record below. Both the card on the home page
   and the project's own page read from it, so a description or tag is written
   once and appears in both places.

   Fields
     slug       file name of the project page, without .html
     category   "design" | "engineering" — which tab the card appears under
     title      shown on the card and, unless pageTitle overrides it, on the page
     pageTitle  optional — use only when the page should read differently
     date       shown on the card and, unless pageDate overrides it, on the page
     pageDate   optional — same idea
     cardTags   coloured tags on the home-page card
     pageTags   coloured tags in the project page header
     card       the short blurb on the card (clamped to 3 lines)
     body       the main prose. Plain HTML: <p>, <h3>, <ul><li>, <strong>, <a>
     details    sidebar blocks — { label, value } or { label, tags: [...] }
     links      sidebar buttons — icon is "github" or "external"
     media      card thumbnail — { type: "video"|"image", src, poster? }
     link       optional external URL for the card
     gallery    folder scanned for gallery.json, relative to projects/

   Order within a category sets the order the cards appear in.
   ============================================================================= */

const PROJECTS = [
  {
    slug: "blooming-rose",
    category: "design",
    title: "Blooming Rose Gift Box",
    date: "Feb 2026",

    cardTags: ["3D Printing", "Product Design"],
    pageTags: ["3D Printing", "Product Design"],

    card:
      "An award-winning 3D-printed gift box whose rose blooms open on a rack-and-pinion mechanism.",

    body: `
      <p>
        The Blooming Rose Gift Box is a fully 3D-printed mechanical gift container designed
        for MakerWorld's "Layered with Love: 2026 Valentine's Day Design Contest." The entry
        won the <strong style="color: var(--text);">Excellent Participation Award</strong> from
        a global pool of submissions.
      </p>
      <p>
        The design problem was how to make opening the gift part of the gift. The answer is a
        blooming mechanism: the rose opens petal by petal as the lid is lifted, revealing what
        sits nested inside.
      </p>
      <p>
        The box is also meant to outlast the occasion. The rose structure works afterwards as a
        jewellery holder or a display object, rather than something that ends up in a drawer.
      </p>

      <h3>Design &amp; Engineering</h3>
      <p>
        A printed rack and pinion system sits under the base. Each petal is hinged at its own
        base and interlocks with its neighbours, so lifting the lid drives all of them outward
        in sequence.
      </p>
      <p>
        Every part prints flat or with minimal supports, and the assembly snaps together. No
        adhesives, no hardware, no tools.
      </p>

      <h3>Customisation</h3>
      <p>
        Because the box is assembled from separate printed parts, each part can be printed in a
        different colour. The model is published on MakerWorld for free download and remixing.
      </p>
    `,

    details: [
      { label: "Context", value: "MakerWorld Valentine's Day Design Contest 2026" },
      { label: "Outcome", value: "Excellent Participation Award" },
      { label: "Tags", tags: ["3D Printing", "Product Design", "Mechanism"] },
      { label: "Tools", value: "Fusion 360 · Bambu Studio · PETG + PLA Multicolour" },
    ],

    links: [
      { label: "View on MakerWorld", href: "https://makerworld.com/en/models/2281548-blooming-rose-gift-box-customizable-multicolor#profileId-2488066", icon: "external" },
    ],

    media: {"type":"video","src":"BloomingRose/BloomingRose.mp4","poster":"BloomingRose/BloomingRose.png"},
    gallery: "../BloomingRose",
  },

  {
    slug: "isaac-game-box",
    category: "design",
    title: "Isaac Game Box",
    date: "Feb 2026",

    cardTags: ["Product Design", "Laser Engraving", "3D Printing"],
    pageTags: ["Product Design", "Laser Engraving", "3D Printing"],

    card:
      "A 3D-printed storage box for the card game Four Souls that opens into a game-ready organiser.",

    body: `
      <p>
        "The Binding of Isaac: Four Souls" ships in a small box with a large number of loose
        components. This project replaces it with a container that holds everything for
        transport and then converts into an organiser for play.
      </p>
      <p>
        The box had to do two jobs. Closed, it holds every component securely and carries
        easily. Open, it becomes part of the table, with coins sorted by type and dice and
        tokens in dedicated slots.
      </p>

      <h3>Structure and Mechanism</h3>
      <p>
        A hinged lid locks when closed. The internal volume is sized to the card counts the
        game actually uses, with two drawer-style compartments underneath for dice, coins
        and tokens.
      </p>
      <p>
        Every part is 3D printed. The outer shell carries a wood texture in the model geometry
        to match the game's rustic artwork.
      </p>
    `,

    details: [
      { label: "Type", value: "Personal Project" },
      { label: "Tags", tags: ["Product Design", "3D Printing", "Game Accessory"] },
      { label: "Materials", value: "PLA with wood-fill" },
      { label: "Tools", value: "Fusion 360 · Bambu Studio" },
    ],

    media: {"type":"image","src":"IsaacGameBox/FourSoulsBoxRender.png"},
    gallery: "../IsaacGameBox",
  },

  {
    slug: "desk-lamp",
    category: "design",
    title: "Desk Lamp",
    date: "Dec 2025",

    cardTags: ["3D Printing", "IoT", "WLED"],
    pageTags: ["3D Printing", "IoT", "WLED"],

    card:
      "A modular 3D-printed lamp with translucent PETG beams, running WLED firmware on an ESP32.",

    body: `
      <p>
        A modular lamp built almost entirely from 3D-printed parts, where the user sets the
        final shape by arranging the light-bearing beams.
      </p>
      <p>
        The arrangement works like a heightmap. Stacked tightly, the lamp reads as dense and
        sculptural. Spread wide, it reads as airy and minimal. No two setups end up the same.
      </p>

      <h3>Slicer Engineering: Translucent PETG</h3>
      <p>
        The beams are printed in translucent PETG for its light transmission. To spread the
        light evenly they are sliced with infill patterns chosen for diffusion rather than
        strength, which gives a soft glow along the full length of each beam instead of
        visible hot spots.
      </p>

      <h3>IOT with Open-Source Firmware WLED</h3>
      <p>
        The lamp runs on <a href="https://kno.wled.ge" target="_blank" rel="noopener">WLED</a>,
        an open-source firmware for addressable LED strips. An ESP8266/ESP32 microcontroller
        hosts a local web server and joins the home network, so the lamp is controlled from any
        browser or the WLED mobile app. It supports hundreds of built-in effects, from a solid
        static colour to reactive audio visualisation, and presets and schedules can be saved.
      </p>
      <p>
        That lets the lamp change character through the day. A warm amber in the evening is a
        few taps from a crisp white for focused work, or from a cycling palette for ambiance.
        Because WLED is open, the lamp also drops into home automation setups like Home
        Assistant with no extra hardware.
      </p>
    `,

    details: [
      { label: "Type", value: "Personal Hobby Project" },
      { label: "Tags", tags: ["3D Printing", "IoT", "WLED", "Product Design", "Lighting"] },
      { label: "Electronics", value: "ESP32 · WS2812B LED strip · 5 V PSU" },
      { label: "Materials", value: "Translucent PETG (beams) · Matte Black PLA (base)" },
      { label: "Tools", value: "Fusion 360 · Bambu Studio · WLED firmware" },
    ],

    media: {"type":"video","src":"DeskLamp/MainVideo.mp4","poster":"DeskLamp/DeskLampRender.png"},
    gallery: "../DeskLamp",
  },

  {
    slug: "snowboard-hanger",
    category: "design",
    title: "Snowboard Hanger",
    date: "Feb 2026",

    cardTags: ["3D Printing", "Product Design"],
    pageTags: ["3D Printing", "Product Design"],

    card:
      "A wall-mounted snowboard hanger with interchangeable multicolour printed faceplates.",

    body: `
      <p>
        A wall-mounted hanger for displaying a snowboard or wakeboard as decor. The mounting
        arm holds the board securely and keeps it flush and level against the wall.
      </p>
      <p>
        The faceplate is the focal point. Two illustrated variants were printed, a mountain
        panorama and an ocean-waves graphic, so the hanger can suit different rooms. Both are
        multicolour prints produced with Bambu Studio's colour-change workflow.
      </p>
    `,

    details: [
      { label: "Type", value: "Personal Project" },
      { label: "Tags", tags: ["3D Printing", "Product Design"] },
      { label: "Materials", value: "PLA, multicolour" },
      { label: "Tools", value: "Fusion 360 · Bambu Studio" },
    ],

    media: {"type":"image","src":"OtherDesigns/SnowboardHanger_Mountain.png"},
  },

  {
    slug: "mini-fan",
    category: "design",
    title: "Mini Hand Fan",
    date: "2024",

    cardTags: ["3D Printing", "Product Design", "Electronics"],
    pageTags: ["3D Printing", "Product Design", "Electronics"],

    card:
      "A handheld fan with a rechargeable battery and USB-C port built into the printed handle.",

    body: `
      <p>
        A compact handheld fan that carries its own power. The handle houses a rechargeable
        battery and a USB-C charging port, so it needs no separate power bank.
      </p>
      <p>
        The housing, blade guard and handle were modelled in Fusion 360 and printed with Bambu
        Studio. The electronics sit inside the handle geometry with no exposed wiring.
      </p>
    `,

    details: [
      { label: "Type", value: "Personal Project" },
      { label: "Tags", tags: ["3D Printing", "Product Design", "Electronics"] },
      { label: "Features", value: "Rechargeable battery · USB-C charging" },
      { label: "Tools", value: "Fusion 360 · Bambu Studio" },
    ],

    media: {"type":"image","src":"OtherDesigns/MiniFan.png"},
  },

  {
    slug: "loco-manipulation",
    category: "engineering",
    title: "Quadrupedal Loco-Manipulation",
    pageTitle: "Learning a General Loco-Manipulation Framework for Quadrupedal Robots",
    date: "Jan 2026 – Present",

    cardTags: ["Reinforcement Learning", "Quadrupeds", "Isaac Sim"],
    pageTags: ["Reinforcement Learning", "Quadrupeds", "Isaac Sim"],

    card:
      "A Unitree Go2 learning to use its own legs for both locomotion and manipulation.",

    body: `
      <p>
        Quadrupedal robots are usually treated as locomotion platforms, with manipulation
        added later as a separate arm and a separate controller. My thesis takes the opposite
        view: the legs are already a capable manipulator, and locomotion and manipulation are
        two modes of the same whole-body problem. The work is ongoing, and develops a
        framework in which a Unitree Go2 uses its own limbs both to move and to act on its
        surroundings.
      </p>
      <p>
        The guiding aim is generality. Behaviours like these are commonly obtained by
        hand-tuning long lists of reward terms, but each term encodes an assumption about how
        the task should be solved, so the result only ever works for that one task. I am
        instead trying to obtain these skills with a minimal reward, putting the effort into
        how the robot explores, how difficulty is introduced, and what structure is built into
        the learning problem.
      </p>

      <h3>Foot Manipulation</h3>
      <p>
        The first objective is a policy that uses a single foot as an end effector, following
        a moving target in space while the remaining legs keep the robot balanced. Because one
        network controls the reaching leg and the supporting stance together, the weight
        shifting and body tilt needed to reach are discovered by the robot rather than
        programmed.
      </p>

      <h3>Bipedal Standing and Locomotion</h3>
      <p>
        The second objective is rearing onto the hind legs, which frees both front limbs for
        interaction. Balanced on two point feet the robot behaves like an inverted pendulum,
        so the policy has to learn to stand, hold the posture against disturbances, and
        eventually move while upright.
      </p>

      <h3>State of the Art Learning Techniques</h3>
      <p>
        The behaviours are obtained through the structure of the learning problem rather than
        through reward shaping. An assistive wrench, a virtual force and torque applied to the
        robot's own body, improves task space exploration by making postures such as a
        two-legged stand reachable at all, and is withdrawn as the policy proves it can hold
        them unaided. Symmetry augmentation uses the robot's left-right symmetry to supply
        every collected experience mirrored as well, which makes learning more efficient for
        policies whose task is itself symmetric. Curricula guide learning by starting the task
        easy and raising difficulty only as competence is demonstrated, easing back when
        performance regresses.
      </p>

      <h3>Proposed Hierarchical Policy Structure</h3>
      <p>
        The two objectives are trained as separate low-level policies, one for foot tracking
        and one for bipedal standing and locomotion. The proposal is to join them under a
        higher-level policy that selects between them and blends their outputs, so reaching,
        standing and walking become available to a single controller instead of each being a
        task of its own. That composition is what turns the individual skills into a general
        loco-manipulation framework.
      </p>
    `,

    details: [
      { label: "Context", value: "MSc Thesis, Politecnico di Milano" },
      { label: "Tags", tags: ["Reinforcement Learning", "Quadrupeds", "Isaac Sim", "PPO"] },
      { label: "Robot", value: "Unitree Go2" },
      { label: "Methods", value: "PPO · Privileged critic · Curriculum learning · Symmetry augmentation" },
      { label: "Tools", value: "Isaac Sim · Isaac Lab" },
    ],

    media: {"type":"video","src":"LocoManipulation/bipedal_sim.mp4","poster":"LocoManipulation/bipedal_sim.jpg"},
    gallery: "../LocoManipulation",
  },

  {
    slug: "soft-robotics",
    category: "engineering",
    title: "Soft Robotics",
    pageTitle: "Soft Robotics Gripper",
    date: "Feb – Jul 2026",

    cardTags: ["Soft Robotics", "Bio-inspired", "Tendon Actuation"],
    pageTags: ["Soft Robotics", "Bio-inspired", "Tendon Actuation"],

    card:
      "A three-finger silicone gripper driving six tendons from one servo, with a palm suction cup.",

    body: `
      <p>
        A three-finger soft robotic gripper built for the Soft Robotics course at Politecnico
        di Milano, developed by a group of six. The goal was, adaptive grasping of
        objects the gripper has no model of: rigid items, floppy ones such as plastic bags
        and gloves, and objects that are wet or fully submerged.
      </p>
      <p>
        Rigid grippers concentrate force at a few contact points and need accurate geometry
        to plan a grasp. Compliant fingers spread contact across the whole surface and
        tolerate misalignment. The implementation pairs soft gripping with a suction cup, 
        bio-inspired micro-structures, and a novel actuation mechanicsm that provides bidirectional 
        control using only one DOF. 

      </p>

      <h3>Fingers</h3>
      <p>
        Three cast silicone fingers sit at 120° around a rigid 3D-printed palm frame. Each is
        80 mm long and incroporates variable slots which provide increasing bending stiffness along 
        the finger, so
        the finger curls naturally as it closes. The contact faces carry hexagonal
        microstructures taken from the attachment pads of clingfish and tree frogs, and the
        grooves between the channels fluid away from the contact patch, which stops the
        finger hydroplaning on a wet surface.
      </p>

      <h3>Actuation</h3>
      <p>
        Each finger runs two antagonistic tendons, six cables in total, terminating on a
        coaxial double spool wound in opposite directions. One servo rotation drives all six,
        which gives active bending in both directions from a single degree of freedom. Cables
        are routed in parallel rather than in series so friction does not accumulate along
        one long path.
      </p>

      <h3>Palm Suction</h3>
      <p>
        A silicone suction cup at the centre of the palm is fed by a syringe-driven vacuum
        line with a pressure sensor on it. It supplies normal pull-off resistance while the
        fingers handle lateral shear, so the two mechanisms cover different load directions.
      </p>

      <h3>Fabrication</h3>
      <p>
        Fingers are cast in 3D-printed moulds in two layers: Ecoflex 00-30 FAST for the
        compliant bulk, then Dragon Skin 10 for body and shape stability. Cable guides are
        laid into the mould before casting to constrain the tendon path and cut friction.
      </p>

      <h3>Frame Design</h3>
      <p>
        The frame provides compact and modular housing for every component. While the compact design
        improves reachability of the gripper, the modular desing provides room for improvement and adaptability.
        The bottom slot of the frame can house a handle for manual operation, or can act as a attachment point
        for a robotic arm. Suction cup can be removed if requested, and its slot can be used to integrate another sensor.
      </p>
    `,

    details: [
      { label: "Context", value: "Soft Robotics Course — Polimi" },
      { label: "Tags", tags: ["Soft Robotics", "Bio-inspired", "Gripper"] },
      { label: "Materials", value: "Ecoflex 00-30 FAST · Dragon Skin 10 · PLA" },
      { label: "Actuation", value: "Servo Driven Wire" },
      { label: "Tools", value: "Fusion 360 · FDM 3D printing" },
    ],

    media: {"type":"video","src":"SoftRobotics/MainVideo.mp4","poster":"SoftRobotics/MainVideo.jpg"},
    gallery: "../SoftRobotics",
  },

  {
    slug: "microros-bot",
    category: "engineering",
    title: "MicroROS Pick-and-Place Robot",
    date: "Jan - Feb 2026",

    cardTags: ["ROS 2", "Autonomous Robotics", "Embedded"],
    pageTags: ["ROS 2", "Autonomous Robotics", "Embedded"],

    card:
      "An autonomous pick-and-place robot running micro-ROS on an ESP32, guided by a ceiling camera.",

    body: `
      <p>
        A fully autonomous pick-and-place robot on a differential-drive platform. It locates a
        red object anywhere on a flat workspace, drives to it, picks it up with a two-DOF servo
        gripper and deposits it at a fixed target, with no human input after launch.
      </p>
      <p>
        The work was in integrating perception, real-time low-level control and high-level task
        planning across three separate computational tiers.
      </p>

      <h3>System Architecture</h3>
      <p>
        The system is partitioned into three tiers communicating over ROS 2:
      </p>
      <ul>
        <li>
          <strong style="color: var(--text);">ESP32 firmware (micro-ROS / FreeRTOS)</strong>:
          hard real-time motor PI control, quadrature encoder sampling at 1 kHz and servo PWM
          generation. Talks over UDP WiFi to the micro-ROS Agent on a PC, which bridges to the
          main ROS network.
        </li>
        <li>
          <strong style="color: var(--text);">PC Python nodes (ROS 2 / OpenCV)</strong>:
          the vision pipeline. AprilTag corner detection for workspace calibration, a
          homography-based coordinate transform and HSV colour segmentation to locate the
          target object. Publishes pose estimates and issues velocity commands.
        </li>
        <li>
          <strong style="color: var(--text);">MATLAB / Simulink Stateflow</strong>:
          the high-level pick-and-place state machine, stepping through navigate-to-object →
          align → descend gripper → grip → navigate-to-target → release.
        </li>
      </ul>
    `,

    details: [
      { label: "Context", value: "Academic Project — Robotics Lab" },
      { label: "Tags", tags: ["ROS 2", "micro-ROS", "Embedded", "Computer Vision", "Stateflow"] },
      { label: "Hardware", value: "ESP32 · 2× DRV8833 · DC motors w/ encoders · 2× Servo · USB camera" },
      { label: "Software", value: "micro-ROS · ROS 2 · OpenCV · MATLAB Simulink Stateflow · Python" },
    ],

    links: [
      { label: "View on GitHub", href: "https://github.com/sarpdengizmen/microros_bot", icon: "github" },
    ],

    media: {"type":"video","src":"MicroRosBot/Operation_Video.mp4","poster":"MicroRosBot/RobotImage.JPEG"},
    link: "https://github.com/sarpdengizmen/microros_bot",
    gallery: "../MicroRosBot",
  },

  {
    slug: "rotary-pendulum",
    category: "engineering",
    title: "Rotary Inverted Pendulum",
    date: "Sep – Dec 2025",

    cardTags: ["Control Systems", "State Estimation", "System Modeling"],
    pageTags: ["Control Systems", "State Estimation", "System Modeling"],

    card:
      "A rotary inverted pendulum with LQR swing-up, pole-placement balancing and a Kalman filter.",

    body: `
      <p>
        The rotary inverted pendulum is a fundamental benchmark in control theory. This project
        covers the full control engineering pipeline: mathematical modelling, controller design,
        state estimation, and hardware validation on a physical rig.
      </p>
      <p>
        The system consists of a motorised rotating arm driving a freely-pivoting pendulum rod.
        The goal is to drive it to the upright
        position from rest and hold it there indefinitely in the face of real-world disturbances,
        friction, sensor noise, and model uncertainty.
      </p>

      <h3>System Modelling</h3>
      <p>
        The equations of motion were derived from Lagrangian mechanics, yielding a coupled
        nonlinear ODE system in the arm angle and pendulum angle. The model parameters were
        estimated from experiments like step response and free oscillations. 
      </p>

      <h3>Swing-Up Strategy</h3>
      <p>
        Optimal control feedforward trajectory was computed offline using the identified nonlinear model,
        while a neighboring LQR controller was designed for the system around the feedforward trajectory to 
        guard against disturbances and model mismatch during the swing-up phase.
      </p>

      <h3>Balancing Controller</h3>
      <p>
        At the upright equilibrium, a pole-placement controller was designed from the linearised model to assign the
        closed-loop eigenvalues to target locations in the left-half complex plane. 
      </p>

      <h3>State Estimation with a Kalman Filter</h3>
      <p>
        The physical rig measures arm angle and pendulum angle directly through encoders, but
        full-state feedback also needs angular velocities. Numerically differentiating the
        encoder signals amplifies quantisation noise, which rules out feeding raw sensor
        derivatives to the controller. A discrete Kalman filter was designed to derive clean
        velocity estimates from the position measurements, with its parameters tuned
        empirically.
      </p>
    `,

    details: [
      { label: "Context", value: "Control Systems Lab — Polimi" },
      { label: "Tags", tags: ["Control Systems", "State Estimation", "MATLAB", "LQR", "Kalman Filter"] },
      { label: "Methods", value: "Lagrangian modelling · Pole placement · LQR · Kalman filter" },
      { label: "Tools", value: "MATLAB · Simulink" },
    ],

    links: [
      { label: "View Report (PDF)", href: "../RotaryInvertedPendulum/ProjectReport.pdf", icon: "external" },
    ],

    media: {"type":"video","src":"RotaryInvertedPendulum/InvPendulum.mp4","poster":"RotaryInvertedPendulum/InvPendulum.jpg"},
    gallery: "../RotaryInvertedPendulum",
  },

  {
    slug: "mode-analysis",
    category: "engineering",
    title: "Mechanical System Identification",
    pageTitle: "Experimental Mode Analysis",
    date: "Apr - Jul 2025",

    cardTags: ["Vibrations", "Data Analysis", "FEA"],
    pageTags: ["Vibrations", "Data Analysis", "FEA"],

    card:
      "Modal analysis from impact hammer FRFs, identified by ITD method and validated against an FE model.",

    body: `
      <p>
        Experimental modal analysis (EMA) identifies a structure's natural frequencies, damping
        ratios and mode shapes directly from measured vibration data, without requiring a
        complete analytical model. This project applies EMA to a physical structure using
        impact hammer testing, frequency response function extraction and time-domain system
        identification to produce a validated modal model.
      </p>

      <h3>Frequency Response Function Extraction</h3>
      <p>
        The structure was excited with an instrumented impact hammer at multiple locations,
        and accelerometer responses were recorded at fixed measurement points. The FRFs (ratio
        of output acceleration to input force in the frequency domain) were computed via the
        H1 estimator, which minimises the effect of output noise. Coherence was monitored
        across all measurements to ensure data integrity before
        any identification step.
      </p>
      <p>
        Multiple impacts per location were averaged to improve the signal-to-noise ratio.
        The resulting FRF matrix reveals peaks at the structure's natural frequencies and
        phase information that encodes the mode shape contributions at each measurement point.
      </p>

      <h3>Ibrahim Time Domain (ITD) Method</h3>
      <p>
        Modal parameters were extracted using the Ibrahim Time Domain method, a classical
        algorithm that identifies poles of the structural system from free-decay response
        data. The method constructs a data matrix from sampled impulse responses and solves
        a generalised eigenvalue problem to extract complex eigenvalues (from which natural
        frequencies and damping ratios are derived) and eigenvectors (mode shapes).
      </p>

      <h3>AutoMAC Validation</h3>
      <p>
        The AutoMAC was used to validate sensor placements prior to the experiments 
        to ensure proper sensor placement for the total identification of all mode shapes.
        After identification, the MAC was also used to confirm the experimentally identified 
        mode shapes are in line with the finite element modal analysis results.
      </p>
    `,

    details: [
      { label: "Context", value: "Vibrations & Structural Dynamics Course — METU" },
      { label: "Tags", tags: ["Structural Dynamics", "Signal Processing", "FEM", "Modal Analysis", "ITD Method"] },
      { label: "Methods", value: "Impact hammer testing · FRF extraction (H1) · ITD · AutoMAC · FE model correlation" },
      { label: "Tools", value: "MATLAB · FE software" },
    ],

    links: [
      { label: "View Presentation (PDF)", href: "../ModeAnalysis/Project Presentation.pdf", icon: "external" },
    ],

    media: {"type":"video","src":"ModeAnalysis/MainVideo.mp4","poster":"ModeAnalysis/MainVideo.jpg"},
    gallery: "../ModeAnalysis",
  },

  {
    slug: "midi-robot",
    category: "engineering",
    title: "MIDI Robot",
    date: "Jan – Jun 2024",

    cardTags: ["Robotics", "Embedded", "Modular Design"],
    pageTags: ["Robotics", "Embedded", "Modular Design"],

    card:
      "A modular ROS 2 research robot with LiDAR, camera, IMU and a hot-swap Makita 18 V battery.",

    body: `
      <p>
        MIDI is a modular mobile robot platform built as a Capstone project for METU's
        ME462 course. The platform was designed to be used as a research and education tool for robotics,
        with a focus on modularity, ease of use, and real-world applicability.
      </p>
      <p>
        The team (Ege Sarp Dengizmen, Erdem Bayraktar, Muhammed Ömer Yiğit, Omar Habib and
        Seçkin Eren Yetim) designed and manufactured MIDI in the METU ROMER lab.
      </p>

      <h3>Sensor Suite</h3>
      <p>
        The base configuration carries the sensors needed for indoor navigation and research:
      </p>
      <ul>
        <li><strong style="color: var(--text);">LiDAR</strong>: 360° planar scan for obstacle avoidance and SLAM</li>
        <li><strong style="color: var(--text);">Wide-angle camera</strong>: visual perception and object detection</li>
        <li><strong style="color: var(--text);">IMU</strong>: orientation and acceleration data</li>
        <li><strong style="color: var(--text);">4× Ultrasonic sensors</strong>: short-range distance measurement</li>
        <li><strong style="color: var(--text);">4× Bumper switches</strong>: contact detection for collision recovery</li>
      </ul>
      <p>
        Sensors are mounted on standardised rails that accept custom brackets, making it
        straightforward to add or reposition sensors as mission requirements change.
      </p>

      <h3>Power System</h3>
      <p>
        MIDI runs on an 18 V Makita battery, chosen for wide availability and hot-swapping. A
        dedicated UPS module protects the Raspberry Pi from voltage sags and sudden
        disconnection, preventing filesystem corruption during hard shutdowns.
      </p>

      <h3>Software and Programmability</h3>
      <p>
        The onboard computer is a Raspberry Pi running ROS 2, with Python as the primary
        user-facing language. The architecture was built to lower the barrier to entry: a
        student who knows basic Python can write a behaviour and deploy it on real hardware
        inside a single lab session.
      </p>
    `,

    details: [
      { label: "Context", value: "METU ME462 Capstone Project" },
      { label: "Team", value: "5 members — Mechanical Engineering, METU" },
      { label: "Tags", tags: ["Robotics", "Embedded", "Modular Design", "ROS 2", "Sensors"] },
      { label: "Computing", value: "Raspberry Pi · ROS 2 · Python" },
      { label: "Power", value: "Makita 18 V battery · UPS module" },
    ],

    links: [
      { label: "View on GitHub", href: "https://github.com/Bayrakt4rdem/MIDI_ROBOT", icon: "github" },
    ],

    media: {"type":"image","src":"MIDIBOT/MIDIBOT.webp"},
    link: "https://github.com/Bayrakt4rdem/MIDI_ROBOT",
    gallery: "../MIDIBOT",
  },

  {
    slug: "wind-turbine",
    category: "engineering",
    title: "Vertical Axis Wind Turbine",
    date: "Sep 2023 – Jan 2024",

    cardTags: ["Renewable Energy", "CAD", "Mechanical Design"],
    pageTags: ["Renewable Energy", "CAD", "Mechanical Design"],

    card:
      "A vertical-axis wind turbine designed with DMST analysis and tested in METU's wind tunnel.",

    body: `
      <p>
        A mixed-type vertical axis wind turbine (VAWT) designed, built and tested for the
        ME-407 final year design course at METU. The target site is the urban and near-urban
        environment, where wind is turbulent, variable in direction and often slow. Those are
        the conditions where horizontal-axis turbines struggle and VAWTs hold a structural
        advantage.
      </p>
      <p>
        Unlike a conventional propeller turbine that must yaw to face the wind, a VAWT
        accepts wind from any direction and works with the same efficiency regardless of
        approach angle. This omnidirectional characteristic makes VAWTs well-suited for
        rooftop installation, city edges, and any site with unpredictable wind roses.
      </p>

      <h3>Aerodynamic Design</h3>
      <p>
        The expected performance of the turbine was predicted using the Double-Multiple Streamtube (DMST)
        aerodynamic model, which divides the flow into multiple streamtubes and applies blade element theory
        to compute the forces on each blade element. The analysis was also validated with CFD simulations.
      </p>

      <h3>Structural Design and Analysis</h3>
      <p>
        The turbine's structural design was informed by the aerodynamic loading predictions. Finite 
        element analysis (FEA) was performed to ensure the blades and shaft could withstand the expected
        stresses. The design was iterated to balance strength, weight, and manufacturability.
      </p>

      <h3>Manufacturing</h3>
      <p>
        The blades were cut from foam on a hot-wire cutter, then reinforced with internal ribs
        and spars to resist deformation under aerodynamic load. The central shaft and arm assembly are machined
        steel, selected for the fatigue resistance required in a continuously rotating system.
        All joints were designed for access, so the turbine can be fully disassembled in the
        lab without special tools.
      </p>

      <h3>Power Generation System and Safety</h3>
      <p>
        The turbine drives a permanent magnet DC generator through a belt drive, which steps
        the shaft up to the speed needed for efficient generation. The electrical output runs
        through a solar charge controller that regulates voltage and current for safe charging
        of a 12 V lead-acid battery. A microcontroller-driven relay shorts the generator to
        produce braking torque if the rotor reaches a dangerous speed.
      </p>

      <h3>Wind Tunnel Testing</h3>
      <p>
        The completed turbine was tested in METU's wind tunnel across a range of wind speeds.
      </p>
    `,

    details: [
      { label: "Context", value: "ME-407 Energy Systems — METU" },
      { label: "Tags", tags: ["Fluid Mechanics", "Renewable Energy", "Design", "VAWT", "Wind Tunnel"] },
      { label: "Methods", value: "DMST aerodynamic model · Blade element theory · FEM" },
      { label: "Manufacturing", value: "Wire-cut foam blades · CNC machined steel shaft · Lab assembly" },
    ],

    links: [
      { label: "View Presentation (PDF)", href: "../WindTurbine/Final_Presentation_C2.pptx.pdf", icon: "external" },
    ],

    media: {"type":"video","src":"WindTurbine/MainVideo.mp4","poster":"WindTurbine/WindTurbine.png"},
    gallery: "../WindTurbine",
  },

  {
    slug: "tuned-mass-damper",
    category: "engineering",
    title: "Tuned Mass Damper",
    date: "Jul – Aug 2023",

    cardTags: ["Vibrations", "MATLAB", "System Identification"],
    pageTags: ["Vibrations", "MATLAB", "System Identification"],

    card:
      "A tuned mass damper optimised by H₂ and H∞ criteria and validated on a physical test rig.",

    body: `
      <p>
        A tuned mass damper (TMD) is a passive vibration absorber, a secondary mass-spring-damper
        system attached to a primary structure to suppress resonant oscillations. By tuning the
        absorber's natural frequency to match the primary structure's resonance, the TMD draws
        kinetic energy away from the main mass and dissipates it internally. This project covers
        the analytical design, optimisation, and physical demonstration of a TMD system.
      </p>
      <p>
        The practical motivation is well-established: TMDs are used in skyscrapers, bridges,
        and precision machinery to manage wind-induced sway, seismic response, and machine
        imbalance. Taipei 101's 660-tonne pendulum damper is perhaps the most visible example.
        This project works through the same physics at lab scale, validating the theory
        against a physical rig.
      </p>

      <h3>2-DOF and 3-DOF Modelling</h3>
      <p>
        The system was modelled as both a 2-DOF system (primary structure + TMD) and a 3-DOF
        extension (primary structure + two TMDs in series) to assess whether a dual-absorber
        arrangement could broaden the effective suppression bandwidth. Equations of motion were
        derived in matrix form and solved in the frequency domain to produce frequency response
        functions (FRFs) for each configuration.
      </p>


      <h3>H₂ and H∞ Optimisation</h3>
      <p>
        Two optimisation criteria were applied to find the best TMD parameters (mass ratio,
        tuning ratio, and damping ratio):
      </p>
      <ul>
        <li>
          <strong style="color: var(--text);">H₂ optimisation</strong>: minimises the total
          energy of the primary structure's response under broadband (white noise) excitation.
          Appropriate when the excitation spectrum is wide and uncertain.
        </li>
        <li>
          <strong style="color: var(--text);">H∞ optimisation</strong>: minimises the worst-case
          peak response across all frequencies (the infinity norm of the FRF). Appropriate when
          the excitation frequency is near-resonant and the goal is tolerance to detuning.
        </li>
      </ul>

      <h3>Physical Demonstration</h3>
      <p>
        The testbed was built from commonly available parts. Rulers act as adjustable
        horizontal stiffness elements, a magnet and copper plate give linear viscous damping
        through eddy currents, an unbalanced hobby motor supplies periodic excitation, and an
        accelerometer records the response.
      </p>
      <p>
        Free decay tests identified the primary structure's damping ratio and natural
        frequency, and the TMD was tuned to that frequency with the optimisation code written
        earlier. The damper suppressed the primary resonance peak repeatably, with measured
        attenuation matching theory to within experimental error.
      </p>
    `,

    details: [
      { label: "Context", value: "METU Summer Research Project" },
      { label: "Tags", tags: ["Vibrations", "Structural Dynamics", "MATLAB", "H₂ / H∞", "Passive Control"] },
      { label: "Methods", value: "2-DOF / 3-DOF modelling · FRF analysis · H₂ optimisation · H∞ optimisation" },
      { label: "Tools", value: "MATLAB · Simulink" },
    ],

    links: [
      { label: "View Report (PDF)", href: "../TunedMassDampener/Summer Project Report.pdf", icon: "external" },
    ],

    media: {"type":"video","src":"TunedMassDampener/ProjectDemonstration.mp4","poster":"TunedMassDampener/ProjectDemonstration.jpg"},
    gallery: "../TunedMassDampener",
  },
];

const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map(p => [p.slug, p]));
