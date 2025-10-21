// 變數宣告
let menuWidth = 200; // 選單寬度
let menuOpacity = 0; // 選單透明度
let sceneBuffer; // 用來儲存靜態背景的圖形緩衝區

function setup() {
    createCanvas(windowWidth, windowHeight);
    // 建立一個與畫布等大的圖形緩衝區
    sceneBuffer = createGraphics(windowWidth, windowHeight);
    renderScene(); // 呼叫一次，將背景繪製到緩衝區
}

function draw() {
    // 1. 將緩衝區的靜態背景貼到主畫布上 (這會清除上一幀的選單)
    image(sceneBuffer, 0, 0);

    // 2. 更新選單透明度
    updateMenuOpacity(); 
    
    // 3. 在背景之上繪製選單
    drawMenu();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // 視窗大小改變時，也要重建緩衝區
    sceneBuffer.resizeGraphics(windowWidth, windowHeight);
    renderScene(); // 重新繪製背景到緩衝區
}

// ===== 以下函數現在會在 sceneBuffer 上繪圖 =====

function renderScene() {
    // 注意：所有繪圖指令前都加上 "sceneBuffer."
    sceneBuffer.background(255); // 在緩衝區上繪製背景
    sceneBuffer.rectMode(CENTER);
    sceneBuffer.stroke(0);

    for (let i = 0; i < 1000; i++) {
        let x = randomGaussian(0.5, 0.13) * sceneBuffer.width;
        let y = randomGaussian(0.5, 0.13) * sceneBuffer.height;
        backInTheDay(x, y); // 這個函數也會在 sceneBuffer 上繪圖
    }

    for (let i = 0; i < 100; i++) {
        let x = randomGaussian(0.5, 0.13) * sceneBuffer.width;
        let y = randomGaussian(0.5, 0.13) * sceneBuffer.height;
        let s = random(sceneBuffer.width) * random(random());
        sceneBuffer.strokeWeight(random(random()));
        if (random() < 0.5) {
            sceneBuffer.square(x, y, s);
        } else {
            sceneBuffer.circle(x, y, s);
        }
    }
}

function backInTheDay(x, y) {
    let c = int(random(10, 50));
    let scl = 0.005;
    let rnd = int(random(4)); // 修正: 範圍是 0, 1, 2, 3
    sceneBuffer.strokeWeight(random(random()));
    sceneBuffer.noFill();
    
    if (rnd == 0) {
      sceneBuffer.beginShape();
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.00001);
            let angle = int(n * 10) * (TAU / 4);
            sceneBuffer.vertex(x, y);
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
        sceneBuffer.endShape();
    }
    else if (rnd == 1) {
      sceneBuffer.beginShape();
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.00001);
            let angle = 10 * n;
            sceneBuffer.vertex(x, y);
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
        sceneBuffer.endShape();
    }

    else if (rnd == 2) {
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.001);
            let angle = int(n * 15) * (TAU / 4);
            sceneBuffer.strokeWeight(random(random()));
            sceneBuffer.circle(x, y, random(random(10)));
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
    }

    else if (rnd == 3) {
        for (let i = 0; i < c; i++) {
            let n = noise(x * scl, y * scl, i * 0.001);
            let angle = 15 * n;
            sceneBuffer.strokeWeight(random(random()));
            sceneBuffer.circle(x, y, random(random(10)));
            x += cos(angle) * 8;
            y += sin(angle) * 8;
        }
    }
}

// ===== 以下函數在主畫布上繪圖 (不變) =====

function updateMenuOpacity() {
    // 如果滑鼠在選單區域內，逐漸增加透明度
    if (mouseX < menuWidth) {
        menuOpacity = lerp(menuOpacity, 255, 0.1); // 緩慢增加透明度
    } else {
        menuOpacity = lerp(menuOpacity, 0, 0.1); // 緩慢減少透明度
    }
}

function drawMenu() {
    // 這些指令是在主畫布上執行的
    // 使用透明度繪製選單
    // 只有當透明度大於 0 時才繪製，增加效率
    if (menuOpacity > 0) {
        fill(200, menuOpacity);
        noStroke();
        rect(0, 0, menuWidth, height); // 在主畫布上畫矩形

        // 繪製選單內容
        fill(0, menuOpacity);
        textSize(16);
        textAlign(LEFT, TOP);
        text("選單項目 1", 10, 10);
        text("選單項目 2", 10, 40);
        text("選單項目 3", 10, 70);
    }
}