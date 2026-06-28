import type { Metadata } from "next";
import './resume.scss';

export const metadata: Metadata = {
  title: "Resume — Shivesh Mohamed",
  description: "Resume of Shivesh Mohamed — Software Engineer based in Georgetown, Guyana. Experience in geospatial systems, web development, and machine learning.",
};

export default function ResumePage() {
  return (
    <div className="resume-page">

      <header className="resume-page-header">
        <h1>Resume</h1>
        <p className="resume-subtitle">Shivesh Mohamed — Software Engineer</p>
        <div className="resume-actions">
          <a
            href="/resume.html"
            download="Shivesh_Mohamed_Resume.html"
            className="btn-download"
          >
            ↓ Download Resume
          </a>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view"
          >
            ↗ Open full page
          </a>
        </div>
      </header>

      <div className="resume-card">

        {/* Summary */}
        <section className="resume-section resume-summary">
          <div className="resume-section-title">Summary</div>
          <p>
            Software engineer with experience building geospatial applications, land administration
            systems, and web platforms. Interested in deep learning — particularly efficient deep
            learning and the practical deployment of models in resource-constrained environments.
            Comfortable across the full stack and with embedded systems. Enjoys open source and
            learning at the boundaries of software and other domains.
          </p>
        </section>

        {/* Experience */}
        <section className="resume-section">
          <div className="resume-section-title">Experience</div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">Guyana Lands and Survey Commission</span>
              <span className="resume-period">Feb 2026 – Present</span>
            </div>
            <div className="resume-role">Software Solutions Developer / Programmer</div>
            <div className="resume-location">Georgetown, Guyana</div>
            <ul>
              <li>Continuous development on internal and external applications with geospatial components.</li>
              <li>Contributed to data modelling, system design and UI/UX across multiple organisational systems.</li>
              <li>DevOps and website maintenance.</li>
              <li>Participated in workshops on practical ML for geospatial analysis and remote sensing.</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">FAO — Sustainable Lands &amp; Development Project</span>
              <span className="resume-period">Sep 2025 – Dec 2025</span>
            </div>
            <div className="resume-role">National Software Solutions Developer / Programmer</div>
            <div className="resume-location">Georgetown, Guyana</div>
            <ul>
              <li>Developed features for the Next Generation Land Management System (NGLMS), a Land Administration and GIS platform.</li>
              <li>Built functionality for viewing and querying dynamic spatial data.</li>
              <li>Implemented security systems and protocols based on policy guidelines.</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">University of Guyana — PACE</span>
              <span className="resume-period">Feb 2023 – Oct 2025</span>
            </div>
            <div className="resume-role">Assistant Technical Officer</div>
            <div className="resume-location">Turkeyen, Guyana</div>
            <ul>
              <li>
                Lead developer on UGRecruit v1, connecting students with employment opportunities —
                live at <a href="https://ugrecruit.uog.edu.gy/" target="_blank" rel="noopener noreferrer">ugrecruit.uog.edu.gy</a>.
              </li>
              <li>Maintained websites under the PACE department.</li>
              <li>Conducted research and report writing on technologies for departmental needs.</li>
              <li>Team <em>Frame Perfect Lite</em> won the UG Innovation Challenge 2025.</li>
            </ul>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">University of Guyana Robotics Club</span>
              <span className="resume-period">2023 – Present</span>
            </div>
            <div className="resume-role">Advisor (Oct 2025 – Present) · Key Personnel (2023 – Sep 2025)</div>
            <ul>
              <li>Provide guidance on project planning, technical issues and club management as Advisor.</li>
              <li>Organised workshops, seminars and local hackathons using PyTorch and the LeRobot toolkit.</li>
              <li>Worked on projects with Arduino and Raspberry Pi using Python and C.</li>
              <li>Participated in open-source research for the Robot Study Companion (RSC) — TTS/STT models.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="resume-section">
          <div className="resume-section-title">Education</div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">University of Guyana</span>
              <span className="resume-period">2021 – 2025</span>
            </div>
            <div className="resume-role">Bachelor of Science, Computer Science</div>
          </div>

          <div className="resume-entry">
            <div className="resume-entry-header">
              <span className="resume-org">Queen&apos;s College</span>
              <span className="resume-period">2015 – 2020</span>
            </div>
            <div className="resume-role">CSEC — Caribbean Secondary Education Certificate</div>
          </div>
        </section>

        {/* Honours & Awards */}
        <section className="resume-section">
          <div className="resume-section-title">Honours &amp; Awards</div>
          <ul className="awards-list">
            <li>
              <span className="award-name">Best Student — Faculty of Natural Sciences</span>
              <span className="award-period">2022 – 2023</span>
            </li>
            <li>
              <span className="award-name">Second Best Student — Faculty of Natural Sciences</span>
              <span className="award-period">2021 – 2022</span>
            </li>
            <li>
              <span className="award-name">Office of the Prime Minister Innovation Challenge 2025 — 1st Place (Hackathon)</span>
            </li>
            <li>
              <span className="award-name">Speaker — Local Climate Organization of Youth (LCOY)</span>
            </li>
          </ul>
        </section>

        {/* Skills */}
        <section className="resume-section">
          <div className="resume-section-title">Skills &amp; Technologies</div>
          <div className="skills-grid">
            <div className="skill-group">
              <div className="skill-label">Languages</div>
              <div className="skill-values">Python, JavaScript / TypeScript, C, PHP, C#</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Web</div>
              <div className="skill-values">Next.js, React, Laravel, .NET, Node.js</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">ML / Data</div>
              <div className="skill-values">PyTorch, NumPy, remote sensing, GIS</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Geospatial</div>
              <div className="skill-values">QGIS, PostGIS, spatial data analysis</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Embedded</div>
              <div className="skill-values">Arduino, Raspberry Pi, microcontrollers</div>
            </div>
            <div className="skill-group">
              <div className="skill-label">Tools</div>
              <div className="skill-values">Linux, Git, Docker, Neovim, DevOps</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
