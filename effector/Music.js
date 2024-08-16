//define
function PITCH(x) {return Math.pow(2,x / 12)}
function TOCH(x) {return Math.floor(x + (Math.floor(x) % 2))}
class Complex{
    constructor(Re,Im){
        this.Re = Re;
        this.Im = (Im === undefined) ? 0 : Im;
    }
    ComplexAbs() {
        return Math.sqrt(this.Re * this.Re + this.Im * this.Im);
    }
    PC(X) {
        return new Complex(this.Re + X.Re, this.Im + X.Im);
    }
    SC(X) {
        return new Complex(this.Re - X.Re, this.Im - X.Im);
    }
    MS(X) {
        return new Complex(this.Re * X, this.Im * X);
    }
    MC(X) {
        return new Complex(this.Re * X.Re - this.Im * X.Im, this.Re * X.Im + this.Im * X.Re);
    }
    DS(X) {
        return new Complex(this.Re / X, this.Im / X);
    }
}
class WaveData{
    constructor(buf){
        this.data = buf.result;
        this.vol = 1;
        this.maxv = 32767;
        this.bytes = new DataView(this.data);
        this.fileSize = this.bytes.byteLength;
        if(this.fileSize < 44){
            alert("16bit 2chのwaveファイルを入れてください");
            return;
        }
        if(!(this.bytes.getUint8(0) == 0x52 && this.bytes.getUint8(1) == 0x49 && this.bytes.getUint8(2) == 0x46 && this.bytes.getUint8(3) == 0x46)
          || !(this.bytes.getUint8(8) == 0x57 && this.bytes.getUint8(9) == 0x41 && this.bytes.getUint8(10) == 0x56 && this.bytes.getUint8(11) == 0x45)){
            alert("16bit 2chのwaveファイルを入れてください");
            return;
        }
        for (let i = 0; i < this.fileSize; ++i)
        {
            if (i < this.fileSize - 4)
            {
                if (this.bytes.getUint8(i) == 0x64 && this.bytes.getUint8(i + 1) == 0x61 && this.bytes.getUint8(i + 2) == 0x74 && this.bytes.getUint8(i + 3) == 0x61)
                {
                    this.fmt = new Array(i + 8);
                    this.fsize = i + 8;
                    for (var j = 0;j < i + 8; j++)
                    {
                        this.fmt[j] = this.bytes.getUint8(j);
                    }
                    this.wave = this.BtoI(this.bytes, i + 8,this.fileSize);
                    this.msize = this.fileSize - i - 8;
                    break;
                }
            }
        }
        this.ch = this.ReadN(this.fmt, 22, 23);
        this.sample = this.ReadN(this.fmt, 24, 27);
        this.bit8 = this.bytes.getUint8(34) / 8;
        if(this.ch != 2 || this.bit8 != 2){
            alert("16bit 2chにしてください　このファイルのチャンネル数：" + this.ch + "　ビット数：" + this.bit8 * 8);
            return;
        }
    }
    Export(cch,fileInput)
    {
        if(cch == 1){

            let rt = new Array(this.msize / 4);
            for (let i = 0; i < this.msize / 2 - 1; i += 2)
            {
                rt[i / 2] = this.wave[i] / 2 + this.wave[i + 1] / 2;
            }
            this.wave = rt;
            this.WriteN(1, 22, 22);
            this.WriteN(this.fileSize - this.msize / 2 - 8, 4, 7);
            this.WriteN(this.fileSize - this.msize / 2 - 126, this.fsize - 4, this.fsize - 1);
            this.msize >>= 1;
        }
        let fr = this.ItoB(this.fmt,this.wave, this.vol * 32767 / this.maxv, this.msize / 2);
        var a = document.createElement('a');
        var blobUrl = window.URL.createObjectURL(new Blob([fr], {type: 'application/octet-stream'}));
        /*
        document.body.appendChild(a);
        a.style = 'display: none';
        // 生成したURLをセット
        a.href = blobUrl;
        // ダウンロードの時にファイル名として表示される
        a.download = "X" + fileInput.files[0].name.substring(0, fileInput.files[0].name.lastIndexOf('.')) + ".wav";
        // クリックイベント発火
        a.click();
        */
        document.getElementById("dl").href = blobUrl;
        document.getElementById("dl").download = "X" + fileInput.files[0].name.substring(0, fileInput.files[0].name.lastIndexOf('.')) + ".wav";
        document.getElementById("pre").src = blobUrl;
    }
    BtoI(x, start, len)
    {
        let rt = new Array((len - start) / 2);
        for (let i = start; i < len; i += 2)
        {
            if (x.getUint8(i + 1) < 0x80)
            {
                rt[(i - start) / 2] = x.getUint8(i + 1) * 256 + x.getUint8(i);
            }
            else
            {
                rt[(i - start) / 2] = (x.getUint8(i + 1) - 256) * 256 + x.getUint8(i);
            }
        }
        return rt;
    }
    WriteN(num,start,end)
    {
        for (let i = end; i >= start; --i)
        {
            let tmp = Math.floor(num / Math.pow(256, i - start));
            this.fmt[i] = tmp;
            num -= this.fmt[i] * Math.pow(256, i - start);
        }
    }
    Quality(rate)
    {
        this.Speed(this.sample * 1.0 / rate, 12 * Math.log2(this.sample * 1.0 / rate));
        this.Rate(rate * 1.0 / this.sample);
    }
    Rate(sp)
    {
        if (Math.abs(sp) < 0.01)
        {
            sp = 10;
        }
        if (sp < 0)
        {
            sp *= -1;
            Reverse();
        }
        this.sample = Math.floor(this.sample * sp);
        this.WriteN(this.sample, 24, 27);
    }
    ItoB(fmt, cmp, mult, cl)
    {
        let rtx = new ArrayBuffer(this.fsize + cl * 2);
        let rt = new DataView(rtx);
        for (let i = 0; i < this.fsize; ++i)
        {
            rt.setUint8(i,fmt[i]);
        }
        for (let i = this.fsize / 2; i < cl + this.fsize / 2; ++i)
        {
            let j = i - this.fsize / 2;
            if (cmp[j] < 0) {
                cmp[j] = Math.max(cmp[j] * mult, -32767) + 65536;
            }else{
                cmp[j] = Math.min(cmp[j] * mult, 32767);
            }
            rt.setUint8(i * 2 + 1,Math.floor(cmp[j] / 256));
            rt.setUint8(i * 2,cmp[j] % 256);
        }
        return rtx;
    }
    Speed(sp, pitch)
    {
        let len = 65536;
        sp *= PITCH(-pitch);
        if (Math.abs(sp) >= 0.1)
        {
            if (sp < 0)
            {
                sp *= -1;
                Reverse();
            }
            let ovr = 0.8;
            this.maxv = 1;
            let ts = TOCH(this.msize / 2 / sp);
            len = TOCH(Math.min(6000 / sp / ovr,6000 / ovr));
            let rt = new Array(ts);
            for (let i = 0;i < ts;i++) {
                rt[i] = 0;
            }
            let k = 0;
            let dt = TOCH(len * sp * ovr);
            for (let i = 0; i < this.msize / 2; i += dt)
            {
                let tmp = new Array(len);
                for (let j = 0; j < len; j++)
                {
                    if (i + j < this.msize / 2)
                    {
                        tmp[j] = this.wave[i + j];
                    }
                    else {
                        tmp[j] = 0;
                    }
                }
                let dx = 0;
                let dy = 100000;
                for (let j = 0; j < len / 2; j += 2)
                {
                    if (rt[k + j] == 0) break;
                    let tdy = Math.sqrt((rt[k + j] - tmp[j]) * (rt[k + j] - tmp[j]));
                    tdy += Math.sqrt((rt[k + j + 1] - tmp[j + 1]) * (rt[k + j + 1] - tmp[j + 1]));
                    if (tdy < dy) {
                        dy = tdy;
                        dx = j;
                    }
                }
                for (let j = dx; j < len; j++)
                {
                    if (k + j < ts)
                    {
                        rt[k + j] = tmp[j];
                        this.maxv = Math.max(this.maxv, Math.abs(rt[k + j] * 1.0));
                    }
                }
                k = TOCH(i / sp);
            }
            let tmp = ts * 2;
            this.fileSize += tmp - this.msize;
            this.msize = tmp;
            this.wave = new Array(ts);
            for (let i = 0;i < ts;i++) {
                this.wave[i] = rt[i];
            }
            tmp = this.Pchange(pitch) * 2;
            this.fileSize += tmp - this.msize;
            this.msize = tmp;
            this.WriteN(this.fileSize - 8, 4, 7);
            this.WriteN(this.fileSize - 126, this.fsize - 4, this.fsize - 1);
        }
    }
    Pchange(pitch)
    {
        let sp = PITCH(pitch);
        this.maxv = 1;
        let ts = TOCH(this.msize / 2 / sp);
        let rt = new Array(ts);
        for (let i = 0;i < ts;i++) {
            rt[i] = 0;
        }
        let tmp;
        for (let i = 0; i < ts - 4; i += 2)
        {
            tmp = TOCH(i * sp);
            rt[i] = this.wave[tmp];
            rt[i + 1] = this.wave[tmp + 1];
        }
        this.wave = new Array(ts);
        for (let i = 0;i < ts;i++) {
            this.wave[i] = rt[i];
            this.maxv = Math.max(this.maxv, Math.abs(1.0 * rt[i]));
        }
        return ts;
    }
    Swap(num, bpm, delta) {
        let delta_i = (delta * this.sample * this.ch);
        let haku_len = (60.0 / bpm * this.sample * this.ch);
        haku_len -= haku_len % (4 * this.ch);
        let syousetsu = new Array(4);
        for (let i = 0; i < 4; i++) {
            syousetsu[i] = new Array(haku_len);
        }
        for (let i = delta_i; i < this.msize / 2; i += haku_len * 4) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < haku_len; k++) {
                    if (i + haku_len * 3 + k < this.msize / 2) {
                        syousetsu[j][k] = this.wave[i + haku_len * j + k];
                    }
                    else {
                        syousetsu[j][k] = 0;
                    }
                }
            }
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < haku_len; k++) {
                    if (i + haku_len * 3 + k < this.msize / 2) {
                        this.wave[i + haku_len * num[j] + k] = syousetsu[j][k];
                    }
                }
            }
        }
    }
    LRdel(del) {
        for (let i = del;i < this.msize / 2;i+=this.ch) {
            this.wave[i - del] = this.wave[i];
        }
    }
    Voicecanseller() {
        for (let i = 0;i < this.msize / 2 - 1;i+=2) {
            this.wave[i] -= this.wave[i + 1];
            this.wave[i + 1] = this.wave[i];
        }
        for (let i = 0;i < this.msize / 2;i++)
        {
            this.wave[i] /= 2;
            this.maxv = Math.max(this.maxv, Math.abs(this.wave[i] + 0.0));
        }
    }
    Mono() {
        for (let i = 0;i < this.msize / 2;i+=this.ch) {
            let tmp = 0;
            for (let j = 0;j < this.ch;j++) {
                tmp += this.wave[i + j];
            }
            tmp /= this.ch;
            for (let j = 0;j < this.ch;j++) {
                this.wave[i + j] = tmp;
            }
        }
    }
    Reverse()
    {
        let tmp;
        for (let i = 0; i < this.msize / 4; ++i)
        {
            tmp = this.wave[i];
            this.wave[i] = this.wave[this.msize / 2 - i - 1];
            this.wave[this.msize / 2 - i - 1] = tmp;
        }
    }
    Flanger(sp,pw)
    {
        let rt = new Array(this.msize / 2);
        sp = -sp;
        const max = 100;
        let del = max;
        this.maxv = 1;
        for (let i = max * this.ch; i < this.msize / 2; i += 4000)
        {
            for (let j = 0; j < 4000; j++)
            {
                if (i + j < this.msize / 2)
                {
                    rt[i + j] = this.wave[i + j] * (1 - pw) + this.wave[i + j - del * this.ch] * pw;
                    this.maxv = Math.max(this.maxv, rt[i + j] * 1.0);
                }
            }
            if (del < 0 || max < del)
            {
                del = Math.max(0.0, Math.min(1.0 * max, del));
                sp *= -1;
            }
            del += sp;
        }
        for (let i = 0;i < this.msize / 2;i++) {
            this.wave[i] = rt[i];
        }
    }
    ConvolutionReverb(rev, mix, disable)
    {
        let len = 65536;
        this.maxv = 1;
        let tmp = new Array(0);
        let tmplen;
        len = 1 << Math.floor(Math.log2(rev.msize));
        disable = Math.floor(disable * len * 4 / this.sample);
        let cmp2 = new Array(len * 2);
        let cmp3 = new Array(len * 2);
        for (let i = 0; i < len * 2; ++i)
        {
            if (i < len) {
                cmp2[i] = new Complex(0);
            }
            else if (i - len < rev.msize / 2)
            {
                cmp2[i] = new Complex(rev.wave[i - len] / rev.maxv / 2);
            }
            else {
                cmp2[i] = new Complex(0);
            }
            cmp3[i] = new Complex(0);
        }
        cmp2 = this.FFT(cmp2);
        console.log("IR_FFT");
        let rt = new Array(this.msize / 2 + len);
        this.msize += len * 2;
        this.fileSize += len * 2;
        this.WriteN(this.fileSize - 8, 4, 7);
        this.WriteN(this.fileSize - 126, this.fsize - 4, this.fsize - 1);
        let cmp = new Array(len * 2);
        let n = Math.floor(2 + this.msize / 2 / len);
        let progress = [0,Math.floor(this.msize / 2 / len + 1)];
        console.log("ConvSTART");
        for (let i = -len; i < this.msize / 2; i += len)
        {
            console.log(progress[0] + "/" + progress[1]); //Progress.
            for (let j = 0; j < len * 2; ++j)
            {
                if (i + j < this.msize / 2 - len && i + j >= 0)
                {
                    cmp[j] = new Complex(this.wave[i + j] / 65536.0);
                }
                else
                {
                    cmp[j] = new Complex(0);
                }
            }
            cmp = this.FFT(cmp);
            console.log("FFT" + progress[0]);
            for (let j = 0; j < disable; ++j)
            {
                cmp[j] = new Complex(0);
            }
            for (let j = len * 2 - disable; j < len * 2; ++j)
            {
                cmp[j] = new Complex(0);
            }
            for (let j = disable; j < len * 2 - disable - 1; ++j)
            {
                let ctmp = cmp[j];
                cmp[j] = cmp2[j].MC(cmp3[j].DS(Math.sqrt(1.0 * n)));
                cmp3[j] = ctmp;
            }
            cmp = this.IFFT(cmp);
            console.log("IFFT" + progress[0]);
            for (let j = 0; j < len; ++j)
            {
                if (i + j >= 0)
                {
                    if (i + j < this.msize / 2 - len) {
                        this.maxv = Math.max(this.maxv, Math.abs(cmp[j].Re * 32768.0 * (1.0 - mix) + this.wave[i + j] * mix));
                        rt[i + j] = Math.floor(cmp[j].Re * 32768.0 * (1.0 - mix) + this.wave[i + j] * mix);
                    }
                    else if (i + j < this.msize / 2) {
                        this.maxv = Math.max(this.maxv, Math.abs(cmp[j].Re * 32768.0));
                        rt[i + j] = Math.floor(cmp[j].Re * 32768.0 * (1.0 - mix));
                    }
                }
            }
            progress[0]++;
        }
        this.wave = new Array(this.msize / 2);
        for (let i = 0; i < this.msize / 2; i++) {
            this.wave[i] = rt[i];
        }
    }
    ReadN(bf, start, end)
    {
        let rt = 0;
        for (let i = end; i >= start; --i)
        {
            rt += bf[i] * Math.pow(256, i - start);
        }
        return rt;
    }
    Time(){
        return this.msize / this.sample / this.ch / this.bit8;
    }
    FFT(ip)
    {
        let len = ip.length;
        let reBitArray = new Array(len);
        let arraySizeHarf = len >> 1;
        reBitArray[0] = 0;
        for (let i = 1; i < len; i <<= 1)
        {
            for (let j = 0; j < i; ++j)
                reBitArray[j + i] = reBitArray[j] + arraySizeHarf;
            arraySizeHarf >>= 1;
        }
        let ot = new Array(len);
        for (let i = 0; i < len; ++i)
        {
            ot[i] = ip[reBitArray[i]];
        }
        let tmp;
        let jp;
        let butterflyDistance;
        let numType;
        let butterflySize;
        let w;
        let u;
        let rz = Math.floor(Math.log2(len));
        for (let stage = 1; stage <= rz; ++stage)
        {
            butterflyDistance = 1 << stage;
            numType = butterflyDistance >> 1;
            butterflySize = butterflyDistance >> 1;
            w = new Complex(1);
            u = new Complex(Math.cos(Math.PI / butterflySize),Math.sin(Math.PI / butterflySize))
            for (let type = 0; type < numType; ++type)
            {
                for (let j = type; j < len; j += butterflyDistance)
                {
                    jp = j + butterflySize;
                    tmp = ot[jp].MC(w);
                    ot[jp] = ot[j].SC(tmp);
                    ot[j] = ot[j].PC(tmp);
                }
                w = w.MC(u);
            }
        }
        return ot;
    }
    IFFT(ip)
    {
        let len = ip.length;
        for (let i = 0; i < len; ++i)
        {
            ip[i].Im = -ip[i].Im;
        }
        ip = this.FFT(ip, len);
        for (let i = 0; i < len; ++i)
        {
            ip[i].Re /= len;
            ip[i].Im /= -len;
        }
        return ip;
    }
}