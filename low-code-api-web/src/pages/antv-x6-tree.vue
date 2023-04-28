// antv-x6-tree.vue
<template>
  <div ref="container" :style="{width: width, height: height}"></div>
</template>

<script>
import { Graph } from "@antv/x6";
import { Scroller } from '@antv/x6-plugin-scroller'

export default {
  name: "TreeDiagram",
  props: {
    // mock ajax fetch data，作为组件从上级传入时删除default
    response: {
      type: Object,
      default: {
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
    },
    // 宽度。默认100%
    width: {
      type: String,
      default: '100%'
    },
    // 高度。默认100%
    height: {
      type: String,
      default: '100vh'
    }
  },
  watch: {
    response() {
      this.$nextTick(() => {
        // 将mounted中的逻辑移进来，进行组件渲染
      })
    }
  },
  mounted() {
    // 创建图形容器
    const container = this.$refs.container;
    const graph = new Graph({
      container,
      width: container.clientWidth,
      height: container.clientHeight,
      grid: true, // 网格。默认10px
      connecting: { // 连线变圆润
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

    // 设置X6树形图的节点和边
    this.response.data.ruleTreeList.forEach(item => {
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
    // 自动居中（上下、左右）
    graph.centerContent();

    // 设置可拖拽、滚动
    graph.use(
      new Scroller({
        enabled: true,
        pageVisible: true,
        pageBreak: true,
        pannable: true
      })
    )
    graph.unlockScroller()

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
