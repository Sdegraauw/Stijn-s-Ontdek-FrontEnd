import HeatmapLayer from "./HeatmapLayer";

const Translater = ({ data, visible, type }) => {
    if (data.length <= 0){
        return <></>
    }

    console.log(data)
    const changedDataFormat = ()=> {
        return(
        data.map(meting => {
            console.log(meting[type])
            return {
                lat : meting.latitude,
                lng : meting.longitude,
                val : meting[type],
                count : 1
            }
        }))
    }
    let endData = changedDataFormat();
    console.log(endData);
    return (<>{ <HeatmapLayer data={endData} visible={visible}></HeatmapLayer> }</>)
}
export default Translater;