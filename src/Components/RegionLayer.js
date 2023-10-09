import {Polygon, Popup} from "react-leaflet";

const RegionLayer = ({ data, visible }) => {
    if (!visible) return (<></>);

    return (
        <>
            {data.map(({ region, cordsList, averageData }) => (
                <Polygon positions={cordsList} key={region.id} color={getRegionColor(region.id)} opacity={0.25} fillOpacity={0.2}>
                    <Popup>
                        <label className="bold">Algemene data {region.name}</label> <br />

                        {averageData.map(({ id, name, data }) => (
                            <div key={id}>
                                <label>
                                    {name}: {data} {getDataTypeSuffix(id)}
                                </label>
                            </div>

                        ))}
                    </Popup>
                </Polygon>
            ))}
        </>)

}

export default RegionLayer;