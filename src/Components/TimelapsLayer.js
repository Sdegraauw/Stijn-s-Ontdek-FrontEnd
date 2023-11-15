import AnimationPlayer from "./AnimationPlayer";

const TimelapsLayer = ({ data }) => {
    let maxTemp = 0;
    data.forEach(meting => {
      if(meting.temperature > maxTemp) {
        maxTemp = meting.temperature;
      }
    })

    const changedDataFormat = {
      max : maxTemp,
      data : data.map(meting => {
        return {
          lat : meting.latitude,
          lng : meting.longitude,
          val : meting.temperature,
          count : 1
        }
      })
    }

    const map = useMap();

    var config = {
        heatmap: map,
        wrapperEl: document.querySelector('.timeline-wrapper'),
        data: changedDataFormat,
        animationSpeed: 100
    }

    var player = new AnimationPlayer();
    player.setAnimationData(changedDataFormat);

    // https://www.patrick-wied.at/static/heatmapjs/example-heatmap-animation.html
    // Wordt allemaal vrij duidelijk uitgelegd.
    // Heatmap instance wordt vgm HeatmapLayer mee bedoeld.

}

export default TimelapsLayer;