import React, { Component } from 'react';
import './roulette.css';
import spinSound from '../assets/ruletaSongs.mp3';

class RouletteWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        "Lapiz", "Libreta", "Otra Vez", "Lapicero", "Perdiste", "Libro", "Carpeta", "Otra vez", "Sopresa", "Perdiste",
        "Desayuno", "-20%", "Otra vez", "Pluma", "-10%", "Sorpresa", "Perdiste", "Lapiz", "Ganaste"
      ],
      startAngle: 0,
      arc: (Math.PI * 2) / 19, // 19 opciones en el array
      spinTimeout: null,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      ctx: null,
    };

    // Crear instancia del audio
    this.spinAudio = new Audio(spinSound);
  }

  componentDidMount() {
    this.drawRouletteWheel();
  }

  byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = (Math.PI * 2) / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  drawRouletteWheel() {
    const canvas = this.refs.canvas;
    if (canvas.getContext) {
      const outsideRadius = 200;
      const textRadius = 160;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;

      ctx.font = '12px Helvetica, Arial';

      for (let i = 0; i < this.state.options.length; i++) {
        const angle = this.state.startAngle + i * this.state.arc;
        ctx.fillStyle = this.getColor(i, this.state.options.length);

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + this.state.arc, false);
        ctx.arc(250, 250, 120, angle + this.state.arc, angle, true);
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(250 + Math.cos(angle + this.state.arc / 2) * textRadius, 250 + Math.sin(angle + this.state.arc / 2) * textRadius);
        ctx.rotate(angle + this.state.arc / 2 + Math.PI / 2);
        const text = this.state.options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

      // Flecha
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.moveTo(250 - 6, 250 - outsideRadius - 14);
      ctx.lineTo(250 + 6, 250 - outsideRadius - 14);
      ctx.lineTo(250 + 6, 250 - outsideRadius + 14);
      ctx.lineTo(250 + 15, 250 - outsideRadius + 14);
      ctx.lineTo(250, 250 - outsideRadius + 30);
      ctx.lineTo(250 - 15, 250 - outsideRadius + 14);
      ctx.lineTo(250 - 6, 250 - outsideRadius + 14);
      ctx.lineTo(250 - 6, 250 - outsideRadius - 14);
      ctx.fill();
    }
  }

  spin() {
    // Reproducir el sonido
    this.spinAudio.play();

    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal);
  }

  rotateWheel(spinAngleStart, spinTime, spinTimeTotal) {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    const startAngle = this.state.startAngle + (spinAngle * Math.PI / 180);
    this.setState({ startAngle }, () => {
      this.drawRouletteWheel();
      this.setState({
        spinTimeout: setTimeout(() => this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal), 30),
      });
    });
  }

  stopRotateWheel() {
    // Detener la reproducción del sonido
    this.spinAudio.pause();
    this.spinAudio.currentTime = 0;

    clearTimeout(this.state.spinTimeout);
    const degrees = this.state.startAngle * 180 / Math.PI + 90;
    const arcd = this.state.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const ctx = this.refs.canvas.getContext("2d");
    ctx.save();
    ctx.font = 'bold 48px Helvetica, Arial';
    const text = this.state.options[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  render() {
    return (
      <div className='container'>
        <canvas ref="canvas" width={500} height={500}></canvas>
        <button className='btn' onClick={() => this.spin()}>Girar Ruleta</button>
      </div>
    );
  }
}

export default RouletteWheel;


/*import React, { Component } from 'react';
import './roulette.css';
import logoImage from '../assets/logo.jpg';

class RouletteWheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: ["Beso", "pinisco", "combo", "pata", "otra vez", "abrazo", "perdon", "grita", "rie", "perdite", "chiste", "pegate", "salta", "llora", "canta", "abrazate", "coscorron", "duerme", "perdiste"],
      startAngle: 0,
      arc: (Math.PI * 2) / 19, // 19 opciones en el array
      spinTimeout: null,
      spinArcStart: 10,
      spinTime: 0,
      spinTimeTotal: 0,
      ctx: null,
    };
  }

  componentDidMount() {
    this.drawRouletteWheel();
  }

  byte2Hex(n) {
    const nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
  }

  RGB2Color(r, g, b) {
    return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
  }

  getColor(item, maxitem) {
    const phase = 0;
    const center = 128;
    const width = 127;
    const frequency = (Math.PI * 2) / maxitem;

    const red = Math.sin(frequency * item + 2 + phase) * width + center;
    const green = Math.sin(frequency * item + 0 + phase) * width + center;
    const blue = Math.sin(frequency * item + 4 + phase) * width + center;

    return this.RGB2Color(red, green, blue);
  }

  drawRouletteWheel() {
    const canvas = this.refs.canvas;
    if (canvas.getContext) {
      const outsideRadius = 200;
      const textRadius = 160;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;

      ctx.font = '12px Helvetica, Arial';

      for (let i = 0; i < this.state.options.length; i++) {
        const angle = this.state.startAngle + i * this.state.arc;
        ctx.fillStyle = this.getColor(i, this.state.options.length);

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + this.state.arc, false);
        ctx.arc(250, 250, 120, angle + this.state.arc, angle, true); // Cambia el radio interior a 0 para llenar el círculo.
        ctx.stroke();
        ctx.fill();

        ctx.save();
        ctx.fillStyle = "white";
        ctx.translate(250 + Math.cos(angle + this.state.arc / 2) * textRadius, 250 + Math.sin(angle + this.state.arc / 2) * textRadius);
        ctx.rotate(angle + this.state.arc / 2 + Math.PI / 2);
        const text = this.state.options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }

        // Arrow
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 6, 250 - outsideRadius - 14);
        ctx.lineTo(250 + 6, 250 - outsideRadius - 14);
        ctx.lineTo(250 + 6, 250 - outsideRadius + 14);
        ctx.lineTo(250 + 15, 250 - outsideRadius + 14);
        ctx.lineTo(250, 250 - outsideRadius + 30);
        ctx.lineTo(250 - 15, 250 - outsideRadius + 14);
        ctx.lineTo(250 - 6, 250 - outsideRadius + 14);
        ctx.lineTo(250 - 6, 250 - outsideRadius - 14);
        ctx.fill();
        }
    }

  spin() {
    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = Math.random() * 3 + 4 * 1000;
    this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal);
  }

  rotateWheel(spinAngleStart, spinTime, spinTimeTotal) {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      this.stopRotateWheel();
      return;
    }
    const spinAngle = spinAngleStart - this.easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    const startAngle = this.state.startAngle + (spinAngle * Math.PI / 180);
    this.setState({ startAngle }, () => {
      this.drawRouletteWheel();
      this.setState({
        spinTimeout: setTimeout(() => this.rotateWheel(spinAngleStart, spinTime, spinTimeTotal), 30),
      });
    });
  }

  stopRotateWheel() {
    clearTimeout(this.state.spinTimeout);
    const degrees = this.state.startAngle * 180 / Math.PI + 90;
    const arcd = this.state.arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    const ctx = this.refs.canvas.getContext("2d");
    ctx.save();
    ctx.font = 'bold 48px Helvetica, Arial';
    const text = this.state.options[index];
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
  }

  easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  render() {
    return (
      <div className='container'>
        <h1>Spin the wheel</h1><br />
        <canvas ref="canvas" width={500} height={500}></canvas>
        <button className='btn' onClick={() => this.spin()}>Girar Ruleta</button>
        <img className='imgLogo' src={logoImage} alt="Logo de ACCO BRANDS CORPORATION" />
        <p className='reserved'><strong>Alienígenas Productora y Agencia Creativa 2023 &copy; All Rights Reserved</strong></p>
      </div>
    );
  }
}

export default RouletteWheel; */