//define
function PITCH(x) {return Math.pow(2,x / 12)}
function TOCH(x) {return Math.floor(x + (Math.floor(x) % 2))}
class Complex{
    constructor(Re,Im){
        this.Re = Re;
        this.Im = (Im === null) ? 0 : Im;
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
            rt = new Array(msize / 4);
            for (let i = 0; i < msize / 2 - 1; i += 2)
            {
                rt[i / 2] = wave[i] / 2 + wave[i + 1] / 2;
            }
            wave = rt;
            this.WriteN(1, 22, 22);
            this.WriteN(this.fileSize - msize / 2 - 8, 4, 7);
            this.WriteN(fileSize - msize / 2 - 126, fsize - 4, fsize - 1);
            msize >>= 1;
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
            num -= this.fmt[i] * Math.pow(256, i - start);
        }
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
                //Reverse();
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
    ReadN(bf, start, end)
    {
        let rt = 0;
        for (let i = end; i >= start; --i)
        {
            rt += bf[i] * Math.pow(256, i - start);
        }
        return rt;
    }
}