interface ToggleSwitchProps {
  value: boolean;
  onToggle: (newValue: boolean) => void;
  onLabel?: string;
  offLabel?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onToggle,
  onLabel = "On",
  offLabel = "Off",
}) => {
  return (
    <div
      onClick={() => onToggle(!value)}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        gap: "10px",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
    >
      {!value && <span style={{color: "#4e7c3c", fontWeight: "bold"}}>{offLabel}</span>}

      <div
        style={{
          width: "50px",
          height: "25px",
          backgroundColor: value ? "#4e7c3c" : "#ccc",
          borderRadius: "25px",
          position: "relative",
          transition: "background-color 0.3s",
        }}
      >
        <div
          style={{
            width: "20px",
            height: "20px",
            backgroundColor: "white",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: value ? "calc(100% - 22px)" : "2px",
            transform: "translateY(-50%)",
            transition: "left 0.3s",
          }}
        />
      </div>

      {value && <span style={{color: "#4e7c3c", fontWeight: "bold"}}>{onLabel}</span>}
    </div>
  );
};

export default ToggleSwitch;
