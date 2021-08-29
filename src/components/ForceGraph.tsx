import { useEffect, useState } from "react";
import getGraphData from "../main";
import { IData } from "../searches/core";
import { ForceGraph3D } from 'react-force-graph';
import SpriteText from "three-spritetext";

// graph payload (with minimalist structure)
const main_data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Alice" },
    ],
};

const ForceGraph: React.FC = () => {
    // the graph configuration, just override the ones you need
    const [graphData, setGraphData] = useState<IData>({ nodes: [], links: [] })
    useEffect(() => {
        getGraphData()
            .then((data: any) => {
                if (data) {
                    setGraphData({
                        nodes: Array.from(new Set(data.nodes)),
                        links: data.links
                    });
                }
            })
    }, [])
    const myConfig = {
        nodeHighlightBehavior: true,
        height: 1000,
        width: 600,
        panAndZoom: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
    };

    const onClickNode = function (nodeId: any) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function (source: any, target: any) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    return (
        <ForceGraph3D
            graphData={graphData}
            nodeAutoColorBy="group"
            nodeThreeObject={(node: any) => {
                const sprite = new SpriteText(node.id);
                sprite.color = node.color;
                sprite.textHeight = 8;
                return sprite;
            }}
        />);
}

export default ForceGraph;
