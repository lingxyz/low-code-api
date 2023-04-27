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
    // 增加节点（节点位置x、y坐标动态计算）
    for (let i = 1; i <= 6; i++) {
      for (let k = 1; k <= i; k++) {
        graph.addNode({
          id: `${i}-${k}`,
          label: `Node ${i}-${k}`,
          width: 80,
          height: 40,
          x: 100 * (k - i/2),
          y: 100 * (i-1),
        })
      }
    }
    // 增加连线
    const edges = [
      ['1-1', '2-1'],
      ['1-1', '2-2'],
      ['2-1', '3-1'],
      ['2-1', '3-2'],
      ['2-2', '3-3'],
      ['3-1', '4-1'],
      ['3-2', '4-2'],
      ['3-3', '4-3'],
      ['3-3', '4-4'],
      ['4-1', '5-1'],
      ['4-1', '5-2'],
      ['4-2', '5-3'],
      ['4-3', '5-4'],
      ['4-4', '5-5'],
      ['5-1', '6-1'],
      ['5-2', '6-2'],
      ['5-3', '6-3'],
      ['5-3', '6-4'],
      ['5-4', '6-5'],
      ['5-5', '6-6'],
    ];
    edges.forEach(([source, target]) =>
      graph.addEdge({
        source: source,
        target: target,
      })
    );
    graph.centerContent();

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
  },
};
</script>
