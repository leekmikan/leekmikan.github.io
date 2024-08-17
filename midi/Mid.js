header = [ 0x4d, 0x54, 0x68, 0x64, 0x00, 0x00, 0x00, 0x06, 0x00, 0x01, 0x00, 0x01, 0x01, 0xe0 ];
track = [ 0x4d, 0x54, 0x72, 0x6b, 0x00, 0x00, 0x00, 0x00 ];
track_end = [ 0x00, 0xff, 0x2f, 0x00 ];
note_pitch = [ 9, 11, 0, 2, 4, 5, 7 ];
let notes = [];
let hnotes = [];
let data = [];
let chs = [0];
let opt_val = 0;
let time = 0;
let bpm = 100;
let ch = 0;
let measure = [ 4, 4 ];
let adj = [5, 0, 7, 2, 9, 4, 11 ];
let sf = 0;
let sf_adj = 0;
let pt_adj = 0;
let pw = 0x5a;
let hu = 4;
const NOTE_ON = 0x90;
const TONE_COLOR = 0xc0;
const OPTION = 0xb0;
const PEDAL_ON = 0x40;
let fname = "Test";
let mult = 1;
let all_tone = -1;
let ig_sf = false;
let ig_bsf = false;
let is_move = false;
let is_bn = false;
let sp = 1.0;
conf_tones = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
class Note{
    constructor(pitch, channel, power, name, bpm, hu, measure)
    {
        this.pitch = pitch;
        this.channel = channel;
        this.power = power;
        this.name = name;
        if(hu === undefined && measure === undefined){
            this.delta = bpm; //delta代わり.
        }else{
            if (hu == 0)
            {
                this.delta = 0;
            }
            else
            {
                this.delta = Math.floor(480 * 480 * measure / bpm / hu / sp);
            }
        }
    }
    Export(before)
    {
        let rt = new Array();
        rt.push(0);
        if (this.channel != 0x40)
        {
            if (before != null)
            {
                if (before.name + before.channel != this.name + this.channel)
                {
                    rt.push(this.name + this.channel);
                }
            }
            else
            {
                rt.push(this.name + this.channel);
            }
        }
        rt.push(this.pitch);
        switch (this.name)
        {
            case 0x40:
                rt.push(this.power);
                break;
            case 0xc0:
                break;
            case 0xb0:
                rt.push(this.power);
                break;
            default:
                rt.push(this.power);
                if (this.delta != 0)
                {
                    for (let i = 3; i >= 0; i--)
                    {
                        if (this.delta >> (7 * i) > 0 || i == 0)
                        {
                            rt.push(Math.floor(0x80 + (this.delta >> (7 * i)) % 128));
                        }
                    }
                    rt[rt.length - 1] -= 0x80;
                    rt.push(this.pitch);
                    rt.push(0);
                    for (let i = 0; i < hnotes.length; i++)
                    {
                        rt.push(0);
                        rt.push(hnotes[i]);
                        rt.push(0);
                    }
                    hnotes = [];
                }
                else
                {
                    hnotes.push(this.pitch);
                }
                break;
        }
        return rt;
    }
    Lyrics()
    {
        let rt = [ 0, 0xff, 0x05 ];
        let tmp = TextEncoder().encode(this.text);
        let lis = new Array(tmp.length);
        for(let i = 0;i < lis.length;i++){
            lis[i] = tmp[i];
        }
        rt.push(lis.length);
        rt = rt.concat(lis);
        return rt;
    }
}
function Export(only_ch)
        {
            data = data.concat(header);
            data = data.concat(track);
            let len = header.length;
            for (let i = 0; i < notes.length; i++)
            {
                if (notes[i].name == 0xfe)
                {
                    Change_Size(data.length - len - track.length + track_end.length, len);
                    data = data.concat(track_end);
                    len = data.length;
                    data = data.concat(track);
                }
                else if (notes[i].name == 0xff)
                {
                    data = data.concat(notes[i].Lyrics());
                }
                else if (only_ch == null || only_ch.indexOf(notes[i].channel) != -1)
                {
                    //data = data.concat(notes[i].Export());
                    if (i == 0)
                    {
                        data = data.concat(notes[i].Export(null));
                    }
                    else
                    {
                        data = data.concat(notes[i].Export(notes[i - 1]));
                    }
                }
            }
            Change_Size(data.length - len - track.length + track_end.length, len);
            data = data.concat(track_end);
            data[11] = chs.length;
            let fr = new Uint8Array(data.length);
            for(let i = 0;i < data.length;i++){
                fr[i] = data[i];
            }
            var a = document.createElement('a');
            var blobUrl = window.URL.createObjectURL(new Blob([fr], {type: 'application/octet-stream'}));
            /*
            document.body.appendChild(a);
            a.style = 'display: none';
            // 生成したURLをセット
            a.href = blobUrl;
            // ダウンロードの時にファイル名として表示される
            a.download = "X" + fileInput.files[0].name.substring(0, fileInput.files[0].name.lastindexOf('.')) + ".wav";
            // クリックイベント発火
            a.click();
            */
            document.getElementById("dl").href = blobUrl;
            document.getElementById("dl").download = "notitle.mid";
            document.getElementById("audio").src = blobUrl;
            data = [];
            notes = [];
            hnotes = [];
            measure = [ 4, 4 ];
            chs = [0];
            ch = 0;
        }
function Change_Size(size, len)
{
    for (let i = 3; i >= 0; i--)
    {
        let min = 1 << (8 * i);
        if (size >= min)
        {
            let tmp = Math.floor(size / min);
            data[7 - i + len] = tmp;
            size -= tmp * min;
        }
        else
        {
            data[7 - i + len] = 0x00;
        }
    }
}
function Pitch(name)
{
    let rt = 0;
    let p = note_pitch[name.charCodeAt(0) - 0x41];
    if (sf > 0)
    {
        for (let i = 0; i < sf; i++)
        {
            if (p == adj[i])
            {
                p++;
                break;
            }
        }
    }
    if (sf < 0)
    {
        for (let i = 0; i < -sf; i++)
        {
            if (p == adj[adj.length - 1 - i])
            {
                p--;
                break;
            }
        }
    }
    p = (is_move) ? (p + conf_tones[(p - sf * 7 + 60) % 12]) : (p + conf_tones[(p + 60) % 12]);
    if (is_bn)
    {
        let nn = p % 12;
        if (nn == 4 || nn == 7 || nn == 11) p = (p + Math.floor(Math.sin(time)));
    }
    switch (name.length)
    {
        case 1:
            rt = (p + 0x3C);
            break;
        case 2:
            rt = (p + 0x3C + (name.charCodeAt(1) - 0x34) * 12);
            break;
        case 3:
            rt = (p + 0x3C + (name.charCodeAt(2) - 0x34) * 12);
            if (name[1] == 'S')
            {
                rt++;
            }
            else if (name[1] == 'F')
            {
                rt--;
            }
            break;
        case 4:
            rt = (p + 0x3C + (name.charCodeAt(3) - 0x34) * 12);
            if (name[1] == 'D' && name[2] == 'S')
            {
                rt += 2;
            }
            else if (name[1] == 'D' && name[2] == 'F')
            {
                rt -= 2;
            }
            break;
    }
    if (ig_sf && name.length > 2)
    {
        name = "" + name[0] + name[name.length - 1];
    }
    return (rt + pt_adj);
}
function Read()
{
    let str = document.getElementById("code").value;
    for (let i = 0; i < str.length; i++)
    {
        let x = str[i];
        if (str[i] == '#')
        {
            let tmp = "";
            let j = 0;
            while (str[i + j] != '\n' && str[i + j] != ';' && i + j < str.length)
            {
                if (str[i + j] == ',')
                {
                    console.log("! (channel..." + ch + ") " + tmp);
                }
                tmp += str[i + j];
                j++;
            }
            j++;
            switch (str[i + 1])
            {
                case 'B':
                    bpm = Rval("#BPM ", tmp);
                    break;
                case 'A':
                    let del = Math.floor(Rval("#ADJ ", tmp));
                    notes.push(new Note(0, ch, 0, NOTE_ON, del));
                    time += del;
                    break;
                case 'C':
                    ch = Math.floor(Rval("#CH ", tmp));
                    if (chs.indexOf(ch) == -1)
                    {
                        chs.push(ch);
                    }
                    time = 0;
                    notes.push(new Note(0, ch, 0, 0xfe, 0));
                    break;
                case 'N':
                    measure[0] = Rval("#NUMERATOR ", tmp);
                    break;
                case 'D':
                    measure[1] = Rval("#DENOMINATOR ", tmp);
                    break;
                case 'H':
                    hu = Math.floor(Rval("#HU ", tmp));
                    break;
                case 'L':
                    if (Math.floor(Rval("#LOG ", tmp) != -99999))
                    {
                        console.log(time);
                    }
                    break;
                case 'S':
                    if (!ig_bsf)
                    {
                        sf = ((Math.floor(Rval("#SF ", tmp) + sf_adj + 6) % 12)) - 6;
                    }
                    else
                    {
                        sf = ((sf_adj + 6) % 12) - 6;
                    }
                    break;
                case 'O':
                    let opt = Math.floor(Rval("#OPT ", tmp));
                    notes.push(new Note(opt, ch, opt_val, OPTION, 0));
                    break;
                case 'P':
                    switch (str[i + 2])
                    {
                        case 'O':
                            pw = Math.floor(Rval("#POWER ", tmp));
                            break;
                        case 'E':
                            let pedal = Math.floor(Rval("#PEDAL ", tmp));
                            notes.push(new Note(pedal, ch, PEDAL_ON, OPTION, 0));
                            break;
                    }
                    break;
                case 'T':
                    if (all_tone == -1)
                    {
                        let t = Math.floor(Rval("#TONE ", tmp));
                        notes.push(new Note(t, ch, 0, TONE_COLOR, 0));
                    }
                    else
                    {
                        notes.push(new Note((all_tone - 1), ch, 0, TONE_COLOR, 0));
                    }
                    break;
                case 'V':
                    opt_val = Math.floor(Rval("#VAL ", tmp));
                    break;
                case 'X':
                    mult = Math.floor(Rval("#X ", tmp));
                    break;
            }
            i += j - 1;
        }
        else if (str[i] >= 'A' && str[i] <= 'G')
        {
            let tmp = "";
            let j = 0;
            while (str[i + j] != ',' && str[i + j] != '\n' && i + j < str.length && str[i + j] != '|')
            {
                if (str[i + j] == ';')
                {
                    console.log("! (channel..." + ch + ") " + tmp);
                }
                tmp += str[i + j];
                j++;
            }
            if (str[i + j] == '\n')
            {
                j++;
            }
            if (str[i + j] == '|')
            {
                notes.push(new Note(Pitch(tmp), ch, pw, NOTE_ON, bpm, 0, measure[0] / measure[1]));
            }
            else
            {
                notes.push(new Note(Pitch(tmp), ch, pw, NOTE_ON, bpm, hu / mult, measure[0] / measure[1]));
                time += notes[notes.length - 1].delta;
            }
            i += j;
        }
        else if (str[i] == '-')
        {
            notes.push(new Note(0x30, ch, 0x00, NOTE_ON, bpm, hu / mult, measure[0] / measure[1]));
            time += notes[notes.length - 1].delta;
            i++;
        }
        else if (str[i] == '\'')
        {
            let j = 0;
            while (str[i + j] != '.' && str[i + j] != '\n' && i + j < str.length - 1)
            {
                j++;
            }
            i += j;
        }
        else if (str[i] == '$')
        {
            let j = 0;
            let tmp = "";
            i++;
            while (str[i + j] != '.' && str[i + j] != '\n' && i + j < str.length - 1)
            {
                tmp += str[i + j];
                j++;
            }
            notes.push(new Note(tmp));
            i += j;
        }
    }
}
function Rval(command, rstr)
{
    let idf = rstr.indexOf(command);
    let rt = 0;
    let sub = false;
    let dot = false;
    let ud = 0;
    if (idf != -1)
    {
        idf += command.length;
        while (!isNaN("" + rstr[idf]) || rstr[idf] == '-' || rstr[idf] == '.')
        {
            if (rstr[idf] == '-')
            {
                sub = true;
            }
            else if (rstr[idf] == '.')
            {
                dot = true;
            }
            else
            {
                if (dot)
                {
                    ud--;
                    rt += Number("" + rstr[idf]) * Math.pow(10, ud);
                }
                else
                {
                    rt *= 10;
                    rt += Number("" + rstr[idf]);
                }
            }
            idf++;
            if (idf == rstr.length)
            {
                break;
            }
        }
    }
    if (sub)
    {
        rt *= -1;
    }
    if (idf == -1)
    {
        rt = -99999;
    }
    return rt;
}