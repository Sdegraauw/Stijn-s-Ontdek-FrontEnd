import d3 from "d3";

const Chart = (Data) =>{
    let width;
    let height;

    let D2Arr=[];
    
    const contours = d3.contours()
    contours
        .size([width, height])
        .thresholds([0, 1, 2, 3, 4]);
    const polygons = contours()
}
export default Chart;