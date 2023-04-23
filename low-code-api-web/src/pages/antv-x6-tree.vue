// antv-x6-tree.vue
<template>
  <div ref="container" style="width: 100%; height: 100vh"></div>
</template>

<script>
import { Graph } from "@antv/x6";

export default {
  name: "TreeDiagram",
  mounted() {
    // 创建图形容器
    const container = this.$refs.container;
    const graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight,
      // 连线变圆润
      connecting: {
        connector: 'rounded',
        router: {
          name: 'er',
          args: {
            offset: 24,
            direction: 'V',
          },
        },
      },
    });

    const data = {
      // 节点
      nodes: [
        {
          id: "node1", // String，可选，节点的唯一标识
          x: 80, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "hello", // String，节点标签
        },
        {
          id: "node2-1", // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },
        {
          id: "node2-2", // String，节点的唯一标识
          x: 10, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },
        {
          id: "node3-1", // String，节点的唯一标识
          x: 10, // Number，必选，节点位置的 x 值
          y: 300, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },{
          id: "node3-2", // String，节点的唯一标识
          x: 120, // Number，必选，节点位置的 x 值
          y: 300, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },{
          id: "node3-3", // String，节点的唯一标识
          x: 300, // Number，必选，节点位置的 x 值
          y: 300, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: "world", // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: "node1", // String，必须，起始节点 id
          target: "node2-1", // String，必须，目标节点 id
        },{
          source: "node1", // String，必须，起始节点 id
          target: "node2-2", // String，必须，目标节点 id
        },{
          source: "node2-1", // String，必须，起始节点 id
          target: "node3-1", // String，必须，目标节点 id
        },{
          source: "node2-1", // String，必须，起始节点 id
          target: "node3-2", // String，必须，目标节点 id
        },{
          source: "node2-1", // String，必须，起始节点 id
          target: "node3-3", // String，必须，目标节点 id
        },
      ],
    };

    // 点击某个节点，显示/隐藏其所有子元素
    graph.on('node:click', ({ e, x, y, node, view }) => {
      e.stopPropagation()
      function toggleVisibleNode (node) {
        const succ = graph.getSuccessors(node, { distance: 1 })
        if (succ) {
          succ.forEach((node) => {
            console.log(node.visible)
            node.toggleVisible(!node.visible)
            toggleVisibleNode(node)
          })
        }
      }
      toggleVisibleNode(node)
    })

    // 将数据渲染到页面上
    graph.fromJSON(data);

  },
};
</script>
