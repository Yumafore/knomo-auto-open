const { Plugin } = require('obsidian');

class KnomoAutoOpenPlugin extends Plugin {
  async onload() {
    // 等待 Obsidian 工作区完全就绪
    this.app.workspace.onLayoutReady(async () => {
      // 获取 Knomo 插件实例
      const knomoPlugin = this.app.plugins.plugins["knomo"];
      if (!knomoPlugin) {
        console.warn("Knomo Auto Open: Knomo 插件未启用，跳过自动打开。");
        return;
      }

      // 调用 Knomo 的 activateView 方法打开界面
      try {
        if (typeof knomoPlugin.activateView === 'function') {
          await knomoPlugin.activateView();
        } else {
          console.warn("Knomo Auto Open: Knomo 插件没有 activateView 方法，请检查 Knomo 版本。");
        }
      } catch (error) {
        console.error("Knomo Auto Open: 打开 Knomo 视图失败", error);
      }
    });
  }

  onunload() {
    // 无需清理
  }
}

module.exports = KnomoAutoOpenPlugin;