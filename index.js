const canvas = document.getElementById('kochCanvas');
const context = canvas.getContext('2d');

function drawKochCurve(x1, y1, x2, y2, depth) {
    context.beginPath();
    if (depth === 0) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    } else {
        const xi = x1 + (x2 - x1) / 3;
        const yi = y1 + (y2 - y1) / 3;

        const xj = 0.5 * (x1 + x2) + Math.sqrt(3) * (y1 - y2) / 6;
        const yj = 0.5 * (y1 + y2) + Math.sqrt(3) * (x2 - x1) / 6;

        const xk = x1 + 2 * (x2 - x1) / 3;
        const yk = y1 + 2 * (y2 - y1) / 3;

        drawKochCurve(x1, y1, xi, yi, depth - 1);
        drawKochCurve(xi, yi, xj, yj, depth - 1);
        drawKochCurve(xj, yj, xk, yk, depth - 1);
        drawKochCurve(xk, yk, x2, y2, depth - 1);
    }
    context.closePath();
    context.stroke();
}

function drawKochSnowflake(x, y, size, depth) {
    const height = size * Math.sqrt(3) / 2;

    const x1 = x;
    const y1 = y + height;

    const x2 = x + size / 2;
    const y2 = y;

    const x3 = x + size;
    const y3 = y + height;

    drawKochCurve(x1, y1, x2, y2, depth);
    drawKochCurve(x2, y2, x3, y3, depth);
    drawKochCurve(x3, y3, x1, y1, depth);
}

function initSnowflake() {
    const depth = parseInt(prompt('Введіть глибину сніжинки Коха'));

    if (isNaN(depth) || depth < 0) {
        alert('Некоректне значення. Будь ласка, введіть невід' +
            'ємне ціле число для глибини сніжинки Коха.');
        return;
    }

    drawKochSnowflake(50, 50, 500, depth);
}

function initKochCurve() {
    const depth = parseInt(prompt('Введіть глибину кривої Коха'));

    if (isNaN(depth) || depth < 0) {
        alert('Некоректне значення. Будь ласка, введіть невід' +
            'ємне ціле число для глибини кривої Коха.');
        return;
    }

    drawKochCurve(50, 150, 550, 150, depth);
}

function choice() {
    const decision = prompt('Вивести сніжинку чи криву Коха (1 - Сніжинка, 2 - Крива)');

    if (isNaN(decision) || decision < 1 || decision > 2) {
        alert('Некоректне значення. 1 - Сніжинка, 2 - Крива');
        return;
    }

    if (decision === '1') {
        initSnowflake();
    } else if (decision === '2') {
        initKochCurve();
    }
}

choice();
