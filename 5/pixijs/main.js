const app = new PIXI.Application({
    width: 400,
    height: 300,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

const rectangle = new PIXI.Graphics();
rectangle.beginFill(0xff0000);
rectangle.drawRect(-50, -25, 100, 50);
rectangle.endFill();

rectangle.x = app.screen.width / 2;
rectangle.y = app.screen.height / 2;

app.stage.addChild(rectangle);

app.ticker.add(() => {
    rectangle.rotation += 0.01;
});
