import "./background-fx.scss";

const ROWS = [
  "software · machine learning · computer vision · deep learning ·",
  "neovim · python · c++ · react · next.js · typescript ·",
  "robotics · embedded · arduino · geospatial · remote sensing ·",
  "llm · cnn · quantization · inference · pytorch · opencv ·",
  "game dev · opengl · graphics · shaders · simulation ·",
  "full-stack · web · systems · research · engineering ·",
  "yolo · facenet · haar · websockets · leaflet · earth engine ·",
  "build · ship · iterate · learn · repeat ·",
];

export default function BackgroundFX() {
  return (
    <div className="background-fx" aria-hidden="true">
      {ROWS.map((text, i) => {
        // alternate direction, vary speed for an organic drift
        const reverse = i % 2 === 1;
        const duration = 45 + (i % 4) * 12;
        return (
          <div className="bg-row" key={i}>
            <div
              className="bg-track"
              style={{
                animationDuration: `${duration}s`,
                animationDirection: reverse ? "reverse" : "normal",
              }}
            >
              <span>{text}&nbsp;</span>
              <span>{text}&nbsp;</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
