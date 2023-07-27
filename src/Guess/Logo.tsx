import { AbsoluteFill } from "remotion"

export const Logo = () => {
  return (<AbsoluteFill style={{
    position: "relative",

    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <span style={{
      position: "absolute",
      bottom: 30,

      color: "#525252",
      fontSize: "50px"
    }}>@nicodemos_quiz</span>
  </AbsoluteFill>)
}