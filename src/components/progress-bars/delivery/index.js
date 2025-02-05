import { Box, LinearProgress } from "@mui/material";

const OCSDeliveryProgressBar = ({ completed, total }) => {
  const percentage = Math.min((completed / total) * 100, 100);

  return (
    <div className="flex items-center gap-[2rem] w-full">
      <div className="relative flex-grow w-full">
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            height: "2.5rem",
            borderRadius: "1.5rem",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#6b8b64",
            },
            backgroundColor: "#ab7170",
          }}
        />

        <div
          title={`TAMAMLANAN SİPARİŞ ${completed}/${total}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "90%",
          }}
        >
          TAMAMLANAN SİPARİŞ {completed}/{total}
        </div>
      </div>
    </div>
  );
};

export default OCSDeliveryProgressBar;
