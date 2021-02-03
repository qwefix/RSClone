export default class StatsPopup {
  constructor(scene, stats, level) {
    this.scene = scene;
    this.stats = stats;
    this.level = level;
    this.create();
  }

  create() {
    const style = { font: '40px monospace', fill: '#fff' };
    const popupWidth = 800;
    const popupHeight = 600;

    this.popup = this.scene.add.graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRect((this.scene.sys.game.config.width - popupWidth) / 2, (this.scene.sys.game.config.height - popupHeight), popupWidth, popupHeight);

    this.title = this.scene.add.text(this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 200,
      'Level complete',
      { font: '50px monospace', fill: '#fff' })
      .setStroke('#000000', 6)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.time = this.scene.add.text(this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY - 50,
      `Time total: ${this.stats.time.toFixed(2)}`,
      style)
      .setStroke('#000000', 6)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.timeBest = this.scene.add.text(this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 50,
      `Time Best: ${this.stats.timeBestCycle.toFixed(2)}`,
      style)
      .setStroke('#000000', 6)
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.continue = this.scene.add.text(this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 200,
      'CONTINUE',
      style)
      .setStroke('#000000', 10)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setInteractive();

    this.menu = this.scene.add.text(this.scene.cameras.main.centerX,
      this.scene.cameras.main.centerY + 280,
      'MENU',
      style)
      .setStroke('#000000', 10)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setInteractive();

    if (this.scene.sys.game.config.language) {
      this.title.setText('Уровень пройден');
      this.time.setText(`Общее время: ${this.stats.time.toFixed(2)}`);
      this.timeBest.setText(`Лучшее время за круг: ${this.stats.timeBestCycle.toFixed(2)}`);
      this.continue.setText('ПРОДОЛЖИТЬ');
      this.menu.setText('МЕНЮ');
    } else {
      this.title.setText('Level complete');
      this.time.setText(`Time total: ${this.stats.time.toFixed(2)}`);
      this.timeBest.setText(`Time Best: ${this.stats.timeBestCycle.toFixed(2)}`);
      this.continue.setText('CONTINUE');
      this.menu.setText('MENU');
    }

    this.continue.on('pointerdown', () => {
      this.scene.scene.start('Game');
    });
    this.menu.on('pointerdown', () => {
      this.scene.sys.game.config.mute = !this.scene.sys.game.config.mute;
      this.scene.sys.game.config.language = !this.scene.sys.game.config.language;
      this.scene.scene.start('Start');
    });
  }
}
