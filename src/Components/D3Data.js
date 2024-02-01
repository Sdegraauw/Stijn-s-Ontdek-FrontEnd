import d3 from "d3";

const Chart = (Data) =>{
    let width;
    let height;

    let D2Arr=[];
    let arrwidth=40;
    let arrheight=40;
    data.measurements.forEach(measurement=>{
        if (measurement.longitude > arrwidth){
            arrwidth = measurement.longitude;
        }
        if (measurement.latitude > arrheight){
            arrheight = measurement.latitude;
        }
    })
    for (let w = 0; w < arrwidth; w++){
        for (let h = 0; h < arrheight; h++){
        }
    }

    const contours = d3.contours()
    contours
        .size([width, height])
        .thresholds([0, 1, 2, 3, 4]);
    const polygons = contours(D2Arr)
}
export default Chart;