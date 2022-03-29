export const displayDuration = (time: number) => {
    function padZero(v: number) {
      return v < 10 ? "0" + v : v;
    }
    const sec = Math.round(time % 60);
    const min = Math.round((time / 60) % 60);
    const hr = Math.round((time / (60 * 60)) % 24);
    return (
      padZero(time ? hr : 0) +
      ":" +
      padZero(time ? min : 0) +
      ":" +
      padZero(time ? sec : 0)
    );
  };