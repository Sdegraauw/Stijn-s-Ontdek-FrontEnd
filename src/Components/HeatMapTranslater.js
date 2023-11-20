import HeatmapLayer from "./HeatmapLayer";

const Translater = ({ data, visible, type }) => {
    if (data.length <= 0){
        return <></>
    }

    let maxval = 0;
    data.forEach(meting => {
        if(meting[type] > maxval) {
            maxval = meting[type];
        }
    })

    console.log(data)
    const changedDataFormat = ()=> {
        return{
            max:maxval,
            min:0,
            data:(
                data.map(meting => {
                    return {
                        lat : meting.latitude,
                        lng : meting.longitude,
                        val : meting[type],
                        count : 1
                    }
                }))
        }
    }
    let endData = changedDataFormat();
    return (<HeatmapLayer data={endData} visible={visible}></HeatmapLayer>)
}
export default Translater;