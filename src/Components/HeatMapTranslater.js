import HeatmapLayer from "./HeatmapLayer";

const Translater = ({ data, visible, type }) => {
    const changedDataFormat = ()=> {
        data : data.map(meting => {
            return {
                lat : meting.latitude,
                lng : meting.longitude,
                val : meting[type],
                count : 1
            }
        })
    }
    changedDataFormat()
    {<HeatmapLayer
        data={data}
        visible={visible}
    />}
}
export default Translater;