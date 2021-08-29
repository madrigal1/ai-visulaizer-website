import { useCallback, useEffect, useRef, useState } from "react";
import getGraphData from "../main";
import { IData, SearchType } from "../searches/core";
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

interface ForceGraphProps {
    search_type: SearchType;
}
const ForceGraph: React.FC<ForceGraphProps> = ({ search_type }) => {
    // the graph configuration, just override the ones you need
    const [graphData, setGraphData] = useState<IData>({ nodes: [], links: [] })
    useEffect(() => {
        getGraphData(search_type)
            .then((data: any) => {
                if (data) {
                    setGraphData({
                        nodes: Array.from(new Set(data.nodes)),
                        links: data.links
                    });
                }
            })
    }, [])
    const fgRef = useRef<any>();

    const handleClick = useCallback(node => {
        // Aim at node from outside it
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000  // ms transition duration
        );
    }, [fgRef]);
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
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            linkWidth={2}
            ref={fgRef}
            onNodeClick={handleClick}
        />);
}

export default ForceGraph;
