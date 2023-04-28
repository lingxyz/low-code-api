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
    // mock ajax fetch data
    const response = {
      data: {
        ruleTreeList: [{
          id: 1,
          subNo: [2,3],
          ruleName: 'hello1',
          level: '1-1'
        }, {
          id: 2,
          subNo: [4],
          ruleName: 'hello2',
          level: '2-1'
        }, {
          id: 3,
          subNo: [4,5,6],
          ruleName: 'hello3',
          level: '2-2'
        }, {
          id: 4,
          subNo: [],
          ruleName: 'hello4',
          level: '3-1'
        }, {
          id: 5,
          subNo: [],
          ruleName: 'hello5',
          level: '3-2'
        }, {
          id: 6,
          subNo: [],
          ruleName: 'hello6',
          level: '3-3'
        }]
      }
    }
    // 设置X6树形图的节点和边
    response.data.ruleTreeList.forEach(item => {
      // 增加节点（节点位置x、y坐标动态计算）
      const [i, k] = item.level.split('-')
      graph.addNode({
        id: item.id,
        label: item.ruleName,
        width: 80,
        height: 40,
        x: 100 * (k - i/2),
        y: 100 * (i-1),
      })
      // 增加连线
      item.subNo.forEach(sub => {
        graph.addEdge({
          source: item.id,
          target: sub,
        })
      })
    })

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
