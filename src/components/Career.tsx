import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Objectives
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Secondary (10th)</h4>
                <h5>Schooling</h5>
              </div>
              <h3>Passed</h3>
            </div>
            <p>
              Completed my 10th grade with a strong academic foundation, achieving 85.7%.
              This reflects my dedication and consistency in learning.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (12th)</h4>
                <h5>Schooling</h5>
              </div>
              <h3>Passed</h3>
            </div>
            <p>
              Completed 12th grade with 74.8%. This period deepened my interest
              in technology, innovation, and problem-solving, leading me to pursue CSE.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE (AI & ML)</h4>
                <h5>JIS College of Engineering</h5>
              </div>
              <h3>2029</h3>
            </div>
            <p>
              Currently expanding my knowledge in Advanced DSA in C++, building real-world
              web development projects, and learning Artificial Intelligence & Machine Learning fundamentals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
