#pragma once
#include <math.h>
#include <fstream>
#include <stdio.h>
#include <iostream>
#define PI 3.1415926535
#define PT(x) std::cout << x << std::endl
#define PITCH(x) pow(2, x / 12.0)
#define TOCH(x) x + (int)(x) % ch
#define POP new double[10]{ -2, 2, 4, 6, 4, -3, -5, -5, -5, -5 }
#define ROCK new double[10]{ 4, 2, -2, -5, -2, 2, 5, 6, 6, 6 }
#define PERFECT new double[10]{ 3, 3, 6, 5, 2, 0, 4, 2, 9, 6 }
class Complex {
public:
    double Re;
    double Im;
    Complex() {
        this->Re = 0;
        this->Im = 0;
    }
    Complex(double Re, double Im) {
        this->Re = Re;
        this->Im = Im;
    }
    double ComplexAbs() {
        return sqrt(this->Re * this->Re + this->Im * this->Im);
    }
    Complex operator +(Complex X) {
        return Complex(this->Re + X.Re, this->Im + X.Im);
    }
    Complex operator +(char X) {
        return Complex(this->Re + X, this->Im + X);
    }
    Complex operator +=(Complex X) {
        this->Re += X.Re;
        this->Im += X.Im;
        return *this;
    }
    Complex operator ++() {
        return *this + Complex(1, 0);
    }
    Complex operator -(Complex X) {
        return Complex(this->Re - X.Re, this->Im - X.Im);
    }
    Complex operator *(double X) {
        return Complex(this->Re * X, this->Im * X);
    }
    Complex operator *(Complex X) {
        return Complex(this->Re * X.Re - this->Im * X.Im, this->Re * X.Im + this->Im * X.Re);
    }
    Complex operator *=(Complex X) {
        Complex* rt = new Complex(0, 0);
        rt->Re = this->Re * X.Re - this->Im * X.Im;
        rt->Im = this->Re * X.Im + this->Im * X.Re;
        *this = *rt;
        delete rt;
        return *this;
    }
    Complex operator *=(double X) {
        this->Re *= X;
        this->Im *= X;
        return Complex(this->Re, this->Im);
    }
    Complex operator /(double X) {
        return Complex(this->Re / X, this->Im / X);
    }
    Complex Pow(double X) {
        if (this->Re == 0 && this->Im == 0) {
            return *this;
        }
        double cmp_abs = this->ComplexAbs();
        double theta = acos(this->Re / cmp_abs);
        if (this->Im < 0) theta *= -1;
        return Complex(cos(theta * X), sin(theta * X)) * pow(cmp_abs, X);
    }
    Complex AbsPow(double X) {
        if (this->Re == 0 && this->Im == 0) {
            return *this;
        }
        double cmp_abs = this->ComplexAbs();
        return *this * pow(cmp_abs, X - 1);
    }
};
Complex* LHfilter(int len,Complex* cmp, int hz, int hight) {
    for (int i = 0; i < len / 2; ++i)
    {
        if ((i < hz && hight == 0) || (i > hz && hight == 1))
        {
            cmp[i] = Complex(0, 0);
            cmp[len - i - 1] = Complex(0, 0);
        }
    }
    return cmp;
}
Complex* Voicecanceller(int len, Complex* cmp, int null, int null2) {
    int maxi = 0;
    double max = 0;
    int er = 5;
    for (int l = 0; l < 2; l++)
    {
        max = 0;
        maxi = er * 2;
        for (int i = 20 + 80 * l; i < 100 + 80 * l; i++)
        {
            double absv = 0;
            int k = 1;
            while (i * k <= 1000)
            {
                absv += cmp[k * i].ComplexAbs();
                k++;
            }
            absv /= k;
            if (max < absv)
            {
                max = absv;
                maxi = i / 2;
            }
        }
        for (int i = maxi; i < len / 2 - er; i += maxi)
        {
            for (int j = i - er; j < i + er; j++)
            {
                cmp[j] = Complex(0, 0);
                cmp[len - j - 1] = Complex(0, 0);
            }
            if (maxi < 40 && i > 1000)
            {
                break;
            }
        }
    }
    return cmp;
}
Complex* Voicesaver(int len, Complex* cmp, int null, int null2) {
    int maxi = 0;
    double max = 0;
    int er = 1;
    maxi = er * 2;
    int* index = new int[36];
    Complex* tmp = new Complex[len];
    for (int i = 0;i < len;i++) {
        tmp[i] = Complex(0, 0);
    }
    for (int i = -60; i < -24; i++) {
        index[i + 60] = (int)(440 * pow(2, i / 12.0));
    }
    for (int i = 0; i < 24; i++)
    {
        double absv = 0;
        int k = 1;
        while (index[i] * k <= 880)
        {
            absv += cmp[k * index[i]].ComplexAbs();
            k++;
        }
        absv /= k;
        if (max < absv)
        {
            max = absv;
            maxi = index[i];
        }
    }
    for (int i = maxi; i < std::min(len / 2 - er,2000); i += maxi)
    {
        for (int j = i - er; j < i + er; j++)
        {
            tmp[j] = cmp[j];
            tmp[len - j - 1] = cmp[len - j - 1];
        }
    }
    for (int i = 0;i < len;i++) {
        cmp[i] = tmp[i];
    }
    delete[] tmp;
    return cmp;
}
Complex* Orgel(int len, Complex* cmp, int top, int null2) {
    top = std::min(top, 48);
    int* index = new int[48];
    int* avr = new int[48];
    int* sort = new int[48];
    Complex* ncmp = new Complex[len];
    for (int i = 0; i < len;i++) {
        ncmp[i] = Complex(0, 0);
    }
    for (int i = -36;i < 12;i++) {
        index[i + 36] = (int)(440 * pow(2, i / 12.0));
        avr[i + 36] = 1;
        sort[i + 36] = 0;
    }
    int sum = 1;
    int alls = 1;
    for (int i = 0; i < len / 2; i++)
    {
        alls += cmp[i].ComplexAbs();
    }
    alls /= len / 2;
    for (int i = 0;i < 48;i++) {
        for (int j = -5;j < 5;j++) {
            if (index[i] + j >= 0 && index[i] + j < len / 2) {
                avr[i] += cmp[index[i] + j].ComplexAbs();
            }
        }
    }
    for (int i = 0;i < 48;i++) {
        for (int j = 0;j < 48;j++) {
            if (sort[j] < avr[i]) {
                for (int k = i - 2;k >= j;k--) {
                    sort[k + 1] = sort[k];
                }
                sort[j] = avr[i];
                break;
            }
        }
    }
    for (int i = 0;i < 48;i++) {
        if (avr[i] >= sort[top - 1]) {
            for (int j = -5;j < 5;j++) {
                if (index[i] + j >= 0 && index[i] + j < len / 2) {
                    sum += cmp[index[i] + j].ComplexAbs();
                }
            }
        }
    }
    for (int i = 0;i < 48;i++) {
        if (avr[i] >= sort[top - 1]) {
            ncmp[index[i]] = cmp[index[i]] * avr[i] / sum * alls;
            ncmp[len - index[i] - 1] = cmp[len - index[i] - 1] * avr[i] / sum * alls;
        }
    }
    delete[] cmp;
    delete[] sort;
    delete[] avr;
    return ncmp;
}
Complex* Log(int len, Complex* cmp, int base, int max) {
    max = (len / 2 < max) ? len / 2 : max;
    long long int sum = 0;
    for (int i = base;i < max;i += base) {
        sum += cmp[i].ComplexAbs();
    }
    for (int i = base;i < max;i += base) {
        PT(cmp[i].ComplexAbs() / sum * 1.0);
    }
    char x = 0;
    std::cin >> x;
    return cmp;
}
class WaveData
    {
    public:
        int msize;
        char* fmt;
        int* wave;
        double vol = 1;
        double maxv = 0;
        WaveData() {}
        WaveData(std::string fname)
        {
            this->fname = fname;
            std::ifstream ifs(fname, std::ios::binary);
            ifs.seekg(0, std::ios::end);
            fileSize = ifs.tellg();
            ifs.seekg(0);
            char* buf = new char[fileSize];
            ifs.read(buf, fileSize);
            bit8 = buf[34] / 8;
            for (int i = 0; i < fileSize; ++i)
            {
                if (i < fileSize - 4)
                {
                    if (buf[i] == 0x64 && buf[i + 1] == 0x61 && buf[i + 2] == 0x74 && buf[i + 3] == 0x61)
                    {
                        fmt = new char[i + 8];
                        fsize = i + 8;
                        for (int j = 0;j < i + 8; j++)
                        {
                            fmt[j] = buf[j];
                        }
                        wave = BtoI(buf, i + 8,fileSize);
                        msize = fileSize - i - 8;
                        break;
                    }
                }
            }
            for (int i = 0; i < msize / 2; i++)
            {
                maxv = std::max(maxv, abs(wave[i]) + 0.0);
            }
            ch = ReadN(buf, 22, 23);
            sample = ReadN(buf, 24, 27);
            vol_min = -pow(256, bit8) / 2;
            vol_max = pow(256, bit8) / 2 - 1;
            ifs.close();
            if (ch != 2 && bit8 != 2) {
                this->Dispose();
            }
            delete[] buf;
        }
        WaveData(int* wd, int msize2,WaveData *source) {
            this->wave = new int[msize2];
            for (int i = 0;i < msize2;++i) {
                this->wave[i] = wd[i];
            }
            this->fmt = new char[50];
            for (int i = 0;i < 50;i++) {
                this->fmt[i] = 255;
            }
            this->msize = msize2 * 2;
            for (int i = 0;i < msize2 / 2;++i) {
                this->maxv = std::max(maxv, abs(wd[i] * 1.0));
            }
            this->ch = source->ch;
            this->bit8 = source->bit8;
            this->fileSize = msize2;
            this->fsize = 50;
            this->sample = source->sample;
        }
        void Mono() {
            for (int i = 0;i < msize / 2;i+=ch) {
                int tmp = 0;
                for (int j = 0;j < ch;j++) {
                    tmp += wave[i + j];
                }
                tmp /= ch;
                for (int j = 0;j < ch;j++) {
                    wave[i + j] = tmp;
                }
            }
        }
        void Rate(double sp)
        {
            if (abs(sp) < 0.01)
            {
                sp = 10;
            }
            if (sp < 0)
            {
                sp *= -1;
                Reverse();
            }
            sample = (int)(sample * sp);
            WriteN(sample, 24, 27);
        }
        void ConvolutionReverb(std::string rname, double mix, int disable)
        {
            int len = 65536;
            maxv = 1;
            disable *= 2;
            int fileSize2;
            int max = 0;
            std::ifstream ifs(rname, std::ios::binary);
            ifs.seekg(0, std::ios::end);
            fileSize2 = ifs.tellg();
            ifs.seekg(0);
            char* bf2 = new char[fileSize2];
            ifs.read(bf2, fileSize2);
            len = 1 << (int)(log(fileSize2) / log(2));
            Complex* cmp2 = new Complex[len * 2];
            Complex* cmp3 = new Complex[len * 2];
            int* tmp = new int[0];
            int tmplen;
            for (int i = 0; i < fileSize2; ++i)
            {
                if (i < fileSize2 - 4)
                {
                    if (bf2[i] == 100 && bf2[i + 1] == 97 && bf2[i + 2] == 116 && bf2[i + 3] == 97)
                    {
                        tmp = BtoI(bf2, i + 8,fileSize2);
                        tmplen = fileSize2 - i - 8;
                        break;
                    }
                }
            }
            delete[] bf2;
            for (int i = len; i < len * 2; ++i)
            {
                if (i - len < tmplen / 2)
                {
                    cmp2[i].Re = tmp[i - len];
                }
            }
            delete[] tmp;
            FT ft = FT();
            cmp2 = ft.FFT(cmp2,len * 2);
            for (int i = 0; i < len; ++i)
            {
                max = (int)std::max(sqrt(cmp2[i].Re * cmp2[i].Re + cmp2[i].Im * cmp2[i].Im), max + 0.0);
            }
            int* rt = new int[msize / 2 + len];
            msize += len * 2;
            fileSize += len * 2;
            WriteN(fileSize - 8, 4, 7);
            WriteN(fileSize - 126, fsize - 4, fsize - 1);
            Complex* cmp = new Complex[len * 2];
            for (int i = -len; i < msize / 2 - len; i += len)
            {
                for (int j = 0; j < len * 2; ++j)
                {
                    if (i + j < msize / 2 - len && i + j >= 0)
                    {
                        cmp[j].Re = wave[i + j];
                    }
                    else
                    {
                        cmp[j] = Complex(0,0);
                    }
                }
                cmp = ft.FFT(cmp,len * 2);
                for (int j = 0; j < disable; ++j)
                {
                    cmp[j] *= mix;
                }
                for (int j = len * 2 - disable; j < len * 2; ++j)
                {
                    cmp[j] *= mix;
                }
                for (int j = disable; j < len * 2 - disable - 1; ++j)
                {
                    Complex ctmp = cmp[j];
                    cmp[j] = cmp[j] * mix + cmp2[j] * (1.0 - mix) / max * cmp3[j];
                    cmp3[j] = ctmp;
                }
                cmp = ft.IFFT(cmp,len * 2);
                for (int j = 0; j < len; ++j)
                {
                    if (i + j >= 0)
                    {
                        maxv = std::max(maxv, abs(cmp[j].Re));
                        rt[i + j] = (int)cmp[j].Re;
                    }
                }
            }
            delete[] cmp;
            delete[] cmp2;
            delete[] cmp3;
            delete[] wave;
            wave = new int[msize / 2];
            for (int i = 0; i < msize / 2;i++) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void ConvolutionReverb2(std::string rname, double mix, int disable)
        {
            int len = 65536;
            maxv = 1;
            disable *= 2;
            int fileSize2;
            int max = 0;
            std::ifstream ifs(rname, std::ios::binary);
            ifs.seekg(0, std::ios::end);
            fileSize2 = ifs.tellg();
            ifs.seekg(0);
            char* bf2 = new char[fileSize2];
            ifs.read(bf2, fileSize2);
            len = 1 << (int)(log(fileSize2) / log(2)) - 1;
            Complex** cmp = new Complex * [2];
            Complex** cmp2 = new Complex * [2];
            Complex** cmp3 = new Complex * [2];
            for (int i = 0; i < 2; ++i) {
                cmp[i] = new Complex[len * 2];
                cmp2[i] = new Complex[len * 2];
                cmp3[i] = new Complex[len * 2];
            }
            int* tmp = new int[0];
            int tmplen;
            for (int i = 0; i < fileSize2; ++i)
            {
                if (i < fileSize2 - 4)
                {
                    if (bf2[i] == 100 && bf2[i + 1] == 97 && bf2[i + 2] == 116 && bf2[i + 3] == 97)
                    {
                        tmp = BtoI(bf2, i + 8, fileSize2);
                        tmplen = fileSize2 - i - 8;
                        break;
                    }
                }
            }
            delete[] bf2;
            for (int i = len * 2; i < len * 4; ++i)
            {
                if (i - len < tmplen / 2)
                {
                    cmp2[i % 2][i / 2].Re = tmp[i - len * 2];
                }
            }
            delete[] tmp;
            FT ft = FT();
            cmp2[0] = ft.FFT(cmp2[0], len * 2);
            cmp2[1] = ft.FFT(cmp2[1], len * 2);
            for (int i = 0; i < len; ++i)
            {
                for (int j = 0; j < 2; ++j) {
                    max = (int)std::max(sqrt(cmp2[j][i].Re * cmp2[j][i].Re + cmp2[j][i].Im * cmp2[j][i].Im), max + 0.0);
                }
            }
            int* rt = new int[msize / 2 + len * 2];
            msize += len * 2;
            fileSize += len * 2;
            WriteN(fileSize - 8, 4, 7);
            WriteN(fileSize - 126, fsize - 4, fsize - 1);
            for (int k = 0; k < 2; ++k) {
                for (int i = -len * 2; i + k < msize / 2 + len; i += len * 2)
                {
                    for (int j = 0; j < len * 2; j++)
                    {
                        if (i + j * 2 + k < msize / 2 - len && i + j * 2 + k >= 0)
                        {
                            cmp[k][j].Re = wave[i + j * 2 + k];
                        }
                        else
                        {
                            cmp[k][j] = Complex(0, 0);
                        }
                    }
                    cmp[k] = ft.FFT(cmp[k], len * 2);
                    for (int j = 0; j < disable; ++j)
                    {
                        cmp[k][j] *= mix;
                    }
                    for (int j = len * 2 - disable; j < len * 2; ++j)
                    {
                        cmp[k][j] *= mix;
                    }
                    for (int j = disable; j < len * 2 - disable - 1; ++j)
                    {
                        Complex ctmp = cmp[k][j];
                        cmp[k][j] = cmp[k][j] * mix + cmp2[k][j] * (1.0 - mix) / max * cmp3[k][j];
                        cmp3[k][j] = ctmp;
                    }
                    cmp[k] = ft.IFFT(cmp[k], len * 2);
                    for (int j = 0; j < len * 2; ++j)
                    {
                        if (i + j * 2 + k < msize / 2 + len && i + j * 2 + k >= 0)
                        {
                            maxv = std::max(maxv, abs(cmp[k][j].Re));
                            rt[i + j * 2 + k] = (int)cmp[k][j].Re;
                        }
                    }
                }
            }
            delete[] cmp;
            delete[] cmp2;
            delete[] cmp3;
            delete[] wave;
            wave = new int[msize / 2];
            for (int i = 0; i < msize / 2; i++) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void Cut(double t0, double t1) {
            int bt0 = t0 * sample * ch;
            int bt1 = t1 * sample * ch;
            bt1 += ch - (bt1 - bt0) % ch;
            int* tmp = new int[bt1 - bt0];
            for (int i = bt0;i < bt1;i++) {
                tmp[i - bt0] = wave[i];
            }
            delete[] wave;
            wave = new int[bt1 - bt0];
            for (int i = 0;i < bt1 - bt0;i++) {
                wave[i] = tmp[i];
            }
            delete[] tmp;
            msize = (bt1 - bt0) * 2;
            fileSize = fsize + msize;
            WriteN(fileSize - 8, 4, 7);
            WriteN(fileSize - 126, fsize - 4, fsize - 1);
        }
        void Export(int cch) {
            std::string name;
            int path_i = fname.find_last_of("\\") + 1;
            int ext_i = fname.find_last_of(".");
            if (path_i != 0) {
                name = fname.substr(path_i, ext_i - path_i) + ".wav";
            }
            else {
                name = fname;
            }
            name = "X" + name;
            Export(cch, name);
        }
        void Export(int cch, std::string name)
        {
            int* rt;
            int alpha = 750;
            switch (cch)
            {
            case 1:
                rt = new int[msize / 4];
                for (int i = 0; i < msize / 2 - 1; i += 2)
                {
                    rt[i / 2] = wave[i] / 2 + wave[i + 1] / 2;
                }
                wave = rt;
                WriteN(1, 22, 22);
                WriteN(fileSize - msize / 2 - 8, 4, 7);
                WriteN(fileSize - msize / 2 - 126, fsize - 4, fsize - 1);
                msize >>= 1;
                break;
            case 4:
                rt = new int[msize];
                for (int i = 0; i < msize / 2 - 3; i += 2)
                {
                    rt[i * 2] = wave[i];
                    rt[i * 2 + 1] = wave[i + 1];
                    if (i >= alpha) {
                        rt[i * 2 + 2] = wave[i - alpha];
                        rt[i * 2 + 3] = wave[i + 1 - alpha];
                    }
                    else {
                        rt[i * 2 + 2] = 0;
                        rt[i * 2 + 3] = 0;
                    }
                }
                wave = rt;
                WriteN(4, 22, 22);
                WriteN(fileSize + msize - 8, 4, 7);
                WriteN(fileSize + msize - 126, fsize - 4, fsize - 1);
                msize <<= 1;
                break;
            default:
                break;
            }
            char* bf = ItoB(wave, vol * vol_max / maxv, msize / 2);
            std::ofstream ifs(name, std::ios::binary);
            ifs.write(fmt, fsize);
            ifs.write(bf, msize);
            delete[] bf;
        }
        void Speed(double sp, double pitch)
        {
            int len = 65536;
            sp *= PITCH(-pitch);
            if (abs(sp) >= 0.1)
            {
                if (sp < 0)
                {
                    sp *= -1;
                    Reverse();
                }
                sp = round(sp * 1000) / 1000;
                double ovr = 0.5;
                maxv = 1;
                int ts = (long)TOCH(msize / 2 / sp);
                len = (int)TOCH(std::min(6000 / sp / ovr,6000 / ovr));
                int* rt = new int[ts];
                for (int i = 0;i < ts;i++) {
                    rt[i] = 0;
                }
                int k = 0;
                for (long i = 0; i < msize / 2; i += (long)TOCH(len * sp * ovr))
                {
                    int* tmp = new int[len];
                    for (int j = 0; j < len; j++)
                    {
                        if (i + j < msize / 2)
                        {
                            tmp[j] = (int)(wave[i + j]);
                        }
                        else {
                            tmp[j] = 0;
                        }
                    }
                    for (int j = 0; j < len; j++)
                    {
                        if (k + j < ts)
                        {
                            rt[k + j] += tmp[j];
                            maxv = std::max(maxv, abs(rt[k + j] * 1.0));
                        }
                    }
                    k = TOCH(i / sp);
                    delete[] tmp;
                }
                int tmp = ts * 2;
                fileSize += tmp - msize;
                msize = tmp;
                delete[] wave;
                wave = new int[ts];
                for (int i = 0;i < ts;i++) {
                    wave[i] = rt[i];
                }
                delete[] rt;
                tmp = Pchange(pitch) * 2;
                fileSize += tmp - msize;
                msize = tmp;
                WriteN(fileSize - 8, 4, 7);
                WriteN(fileSize - 126, fsize - 4, fsize - 1);
            }
        }
        void Spring(double sp, double mdel)
        {
            int* rt = new int[msize / 2];
            sp = -sp;
            double del = mdel;
            for (int i = (int)(mdel * ch); i < msize / 2; i++)
            {
                rt[i] = wave[i] / 2 + wave[(int)(i - del * ch)] / 2;
                if (del < 0 || 1000 < del)
                {
                    del = std::max(0.0, std::min(mdel, del));
                    sp *= -1;
                }
                del += sp;
            }
            for (int i = 0; i < msize / 2; i++)
            {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void FIR(int len, int step, bool weight) {
            int* rt = new int[msize / 2];
            for (int i = 0; i < len * 2 * step; i++) {
                rt[i] = 0;
            }
            int div = (weight) ? len * (len + 1) / 2 : len;
            double sigma = 0.0;
            for (int i = len * 2 * step; i < msize / 2; i += 2) {
                for (int j = 0; j < 2; j++) {
                    sigma = 0;
                    for (int k = 0; k < len; k++) {
                        if (weight) {
                            sigma += (len - k) * wave[i + j - k * 2 * step] / div;
                        }
                        else {
                            sigma += wave[i + j - k * 2 * step] / div;
                        }
                    }
                    rt[i + j] = (int)sigma;
                    maxv = std::max(maxv, rt[i + j] * 1.0);
                }
            }
            for (int i = len * 2 * step; i < msize / 2; i++) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void Echo(int ms,double pw, int rp) {
            int* rt = new int[msize / 2];
            ms = ms * sample * ch / 1000;
            for (int i = 0;i < rp * ms;i++) {
                rt[i] = wave[i];
            }
            for (int i = ms * rp;i < msize / 2;i++) {
                for (int j = 0;j < rp + 1;j++) {
                    rt[i] += wave[i - ms * j] * pow(pw, j);
                }
            }
            for (int i = ms * rp;i < msize / 2;i++) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void AlgorithmicReverb(int ms, double pw,double wet) {
            int del[] = { 29,31,37,41 };
            const int dels = 4;
            ms = ms * sample * ch / 1000 / del[0];
            ms >>= 1;
            if (ms % 2 != 0) ms--;
            for (int k = 0;k < dels;k++) {
                for (int i = ms * del[k];i < msize / 2;i++) {
                    wave[i] += wave[i - ms * del[k]] * pw * wet;
                }
            }
            for (int i = 0; i < msize / 2; i++)
            {
                maxv = std::max(maxv, abs(wave[i]) + 0.0);
            }
        }
        void LRdel(int del) {
            for (int i = del;i < msize / 2;i+=ch) {
                wave[i - del] = wave[i];
            }
        }
        void Quality(int rate)
        {
            Speed(sample * 1.0 / rate, 12 * log(sample * 1.0 / rate) / log(2));
            Rate(rate * 1.0 / sample);
        }
        void Flanger(double sp,double pw)
        {
            int* rt = new int[msize / 2];
            sp = -sp;
            const int max = 100;
            double del = max;
            maxv = 1;
            for (int i = max * ch; i < msize / 2; i += 4000)
            {
                for (int j = 0; j < 4000; j++)
                {
                    if (i + j < msize / 2)
                    {
                        rt[i + j] = wave[i + j] * (1 - pw) + wave[i + j - (int)del * ch] * pw;
                        maxv = std::max(maxv, rt[i + j] * 1.0);
                    }
                }
                if (del < 0 || max < del)
                {
                    del = std::max(0.0, std::min(1.0 * max, del));
                    sp *= -1;
                }
                del += sp;
            }
            for (int i = 0;i < msize / 2;i++) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void Equalizer(double* mult)
        {
            int len = 65536;
            for (int i = 0; i < 10; i++)
            {
                mult[i] = pow(10, mult[i] / 20.0);
            }
            int* hz = new int[11]{31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000,len / 2 };
            maxv = 1;
            int* rt = new int[msize / 2];
            int hm = msize / 2;
            Complex* cmp = new Complex[len];
            for (int i = 0; i < hm; i += len)
            {
                for (int j = 0; j < len; j++)
                {
                    if (i + j < hm)
                    {
                        cmp[j] = Complex(wave[i + j], 0);
                    }
                    else {
                        cmp[j] = Complex(0, 0);
                    }
                }
                FT ft = FT();
                cmp = ft.FFT(cmp,len);
                for (int j = 0; j < 10; j++)
                {
                    for (int k = hz[j]; k < hz[j + 1]; k++)
                    {
                        if (j == 9) {
                            cmp[k] *= mult[j];
                            cmp[len - k - 1] *= mult[j];
                        }
                        else {
                            double tmp = (j - hz[j]) / (hz[j + 1] - hz[j]);
                            cmp[k] *= mult[j] * (1 - tmp) + mult[j + 1] * tmp;
                            cmp[len - k - 1] *= mult[j] * (1 - tmp) + mult[j + 1] * tmp;
                        }
                    }
                }
                cmp = ft.IFFT(cmp,len);
                for (int j = 0; j < len; j++)
                {
                    if (i + j < hm)
                    {
                        maxv = std::max(maxv, abs(cmp[j].Re));
                        rt[i + j] = (int)cmp[j].Re;
                    }
                }
            }
            delete[] hz;
            delete[] cmp;
            for (int i = 0;i < msize / 2;++i) {
                wave[i] = rt[i];
            }
            delete[] rt;
        }
        void Edit(Complex* (*func)(int,Complex*, int, int),int param1,int param2,int l) {
            int len = l;
            int* rt = new int[msize / 2];
            for (int i = 0; i < msize / 2; i += len / 2)
            {
                Complex* cmp = new Complex[len];
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        cmp[j] = Complex(wave[i + j] * 0.5, 0);
                    }
                }
                FT ft = FT();
                cmp = ft.FFT(cmp, len);
                cmp = func(len,cmp, param1,param2);
                cmp = ft.IFFT(cmp, len);
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        rt[i + j] += (int)cmp[j].Re;
                    }
                }
                delete[] cmp;
            }
            for (int i = 0;i < msize / 2;i++) {
                wave[i] = rt[i];
                maxv = std::max(maxv, abs(rt[i] * 1.0));
            }
            delete[] rt;
        }
        void Voicecanseller() {
            for (int i = 0;i < msize / 2 - 1;i+=2) {
                wave[i] -= wave[i + 1];
                wave[i + 1] = wave[i];
            }
            for (int i = 0;i < msize / 2;i++)
            {
                wave[i] /= 2;
                maxv = std::max(maxv, abs(wave[i] + 0.0));
            }
        }
        void Alien(int block, double mult, double min, double max, double start) {
            int* tmpw = new int[block];
            maxv = 0.5;
            const double ovr = 0.5;
            int sum = 0;
            double sp = start;
            int sg = 1;
            for (int i = 0; i < msize / 2; i += TOCH(block * ovr)) {
                sp += sg * mult / sp;
                if (sp > max) {
                    sp = max;
                    sg *= -1;
                }
                else if (sp < min) {
                    sp = min;
                    sg *= -1;
                }
                sum += TOCH(block / sp * ovr);
            }
            int* rt = new int[sum];
            for (int i = 0; i < sum; i++) {
                rt[i] = 0;
            }
            sp = start;
            sg = 1;
            int ws = sum;
            sum = 0;
            for (int i = 0; i < msize / 2; i += TOCH(block * ovr)) {
                for (int j = 0; j < block; ++j) {
                    if (i + j < msize / 2) {
                        tmpw[j] = wave[i + j];
                    }
                    else {
                        tmpw[j] = 0;
                    }
                }
                sp += sg * mult / sp;
                if (sp > max) {
                    sp = max;
                    sg *= -1;
                }
                else if (sp < min) {
                    sp = min;
                    sg *= -1;
                }
                WaveData tmpd = WaveData(tmpw, block, this);
                tmpd.Speed(sp, 12 * log(sp) / log(2));
                for (int j = 0; j < tmpd.msize / 2; ++j) {
                    if (sum + j < ws) {
                        rt[sum + j] = tmpd.wave[j];
                        maxv = std::max(maxv, abs(rt[sum + j] * 1.0));
                    }
                }
                sum += TOCH(tmpd.msize / 2 * ovr);
            }
            delete[] wave;
            wave = new int[ws];
            for (int i = 0; i < ws; ++i) {
                wave[i] = rt[i];
            }
            ws = ws * 2;
            fileSize += ws - msize;
            msize = ws;
            WriteN(fileSize - 8, 4, 7);
            WriteN(fileSize - 126, fsize - 4, fsize - 1);
            delete[] tmpw;
            delete[] rt;
        }
        void Harmony(double* code,int csize) {
            maxv = 1;
            for (int i = 0;i < msize / 2;i++) {
                wave[i] /= (csize + 1);
            }
            for (int i = 0;i < csize;i++) {
                WaveData tmp = WaveData(wave, msize / 2, this);
                tmp.Speed(1, code[i]);
                int mj = std::min(tmp.msize / 2, msize / 2);
                for (int j = 0;j < msize / 2;j++) {
                    wave[j] += tmp.wave[j];
                }
                tmp.Dispose();
            }
            for (int i = 0;i < msize / 2;i++) {
                maxv = std::max(maxv, wave[i] * 1.0);
            }
        }
        void MakeWave(int base, double ps[], int pl) {
            for (int i = 0;i < pl;i++) {
                for (int j = 0;j < msize / 2;j += 2) {
                    wave[j] += 32768 * ps[i] * sin(PI * base * (i + 1) * j / sample);
                    wave[j + 1] += 32768 * ps[i] * sin(PI * base * (i + 1) * j / sample);
                }
            }
        }
        void Reverse()
        {
            int tmp;
            for (int i = 0; i < msize / 4; ++i)
            {
                tmp = wave[i];
                wave[i] = wave[msize / 2 - i - 1];
                wave[msize / 2 - i - 1] = tmp;
            }
        }
        void Dispose() {
            delete[] fmt;
            delete[] wave;
        }
        void Tremolo(double amp, double time) {
            for (int i = 0;i < msize / 2 - 1;i+=2) {
                double tmp = amp * sin(PI * i / sample / time) + (1 - amp);
                wave[i] *= amp * sin(PI * i / sample / time) + (1 - amp);
                wave[i + 1] *= amp * sin(PI * i / sample / time) + (1 - amp);
            }
        }
        void Multiple(double x,double mul) {
            double btime = x * sample * ch;
            maxv = 1;
            int* tmpw = new int[msize / 2];
            short* mulx = new short[msize / 2];
            for (int i = 0; i < msize / 2; i++) {
                tmpw[i] = wave[i];
                wave[i] = 0;
                mulx[i] = 0;
            }
            const int k = 15;
            for (int i = 0; i < k; i++) {
                WaveData tmp = WaveData(tmpw, msize / 2, this);
                tmp.Speed(1 + mul * i / 100.0, 12 * log(1 + mul * i / 100.0) / log(2));
                int tmpj = TOCH(btime * (mul * i / 100.0) / (1 + mul * i / 100.0));
                for (int j = tmpj; j < tmp.msize / 2 + tmpj; j++) {
                    wave[j] += tmp.wave[j - tmpj];
                    mulx[j]++;
                }
                tmp.Dispose();
            }
            for (int i = 0; i < msize / 2; i++) {
                wave[i] /= mulx[i];
                maxv = std::max(maxv, abs(wave[i] * 1.0));
            }
            delete[] tmpw;
            delete[] mulx;
        }
        void Rough(int x) {
            for (int i = 0; i < msize / 2 - 1; i++) {
                wave[i] = round(wave[i] / x) * x;
            }
        }
        void Compressor(double power) {
            double _maxv = 1;
            for (int i = 0; i < msize / 2; i++) {
                if(wave[i] != 0) wave[i] = (int)(wave[i] * pow(abs(wave[i] * 1.0), power - 1));
                _maxv = std::max(wave[i] * 1.0, _maxv);
            }
            for (int i = 0; i < msize / 2; i++) {
                wave[i] = (int)(wave[i] * maxv / _maxv);
            }
        }
        void Wah(int len,int dhz,int pm,int pad) {
            int range[2] = { 800,3000 };
            int hz = 0;
            int sign = 1;
            int* rt = new int[msize / 2];
            for (int i = 0; i < msize / 2; i += len / 2)
            {
                Complex* cmp = new Complex[len];
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        cmp[j] = Complex(wave[i + j] * 0.5, 0);
                    }
                }
                FT ft = FT();
                cmp = ft.FFT(cmp, len);
                for (int j = hz - pm; j < hz + pm; j++)
                {
                    if (j >= 0 && j < len / 2) {
                        cmp[j] *= 5;
                        cmp[len - j - 1] = cmp[j];
                    }
                }
                cmp = ft.IFFT(cmp, len);
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        rt[i + j] += (int)cmp[j].Re;
                    }
                }
                hz += sign * dhz;
                if (hz < range[0] - pad) {
                    hz = range[0];
                    sign *= -1;
                }
                else if (hz > range[1]) {
                    hz = range[1];
                    sign *= -1;
                }
                delete[] cmp;
            }
            for (int i = 0; i < msize / 2; i++) {
                wave[i] = rt[i];
                maxv = std::max(maxv, abs(rt[i] * 1.0));
            }
            delete[] rt;
        }
        void Wah2(int len, double dhz, double pm) {
            int range[2] = { 500,8000 };
            int hz = 0;
            int sign = 1;
            int* rt = new int[msize / 2];
            for (int i = 0; i < msize / 2; i += len / 2)
            {
                Complex* cmp = new Complex[len];
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        cmp[j] = Complex(wave[i + j] * 0.5, 0);
                    }
                }
                FT ft = FT();
                cmp = ft.FFT(cmp, len);
                for (int j = (int)(hz / pm); j < hz * pm; j++)
                {
                    if (j >= 0 && j < len / 2) {
                        cmp[j] *= 10;
                        cmp[len - j - 1] = cmp[j];
                    }
                }
                cmp = ft.IFFT(cmp, len);
                for (int j = 0; j < len; j++)
                {
                    if (i + j < msize / 2)
                    {
                        rt[i + j] += (int)cmp[j].Re;
                    }
                }
                hz = (int)(1.0 * hz * pow(dhz,sign * 1.0));
                if (hz < range[0]) {
                    hz = range[0];
                    sign *= -1;
                }
                else if (hz > range[1]) {
                    hz = range[1];
                    sign *= -1;
                }
                delete[] cmp;
            }
            for (int i = 0; i < msize / 2; i++) {
                wave[i] = rt[i];
                maxv = std::max(maxv, abs(rt[i] * 1.0));
            }
            delete[] rt;
        }
        void Test(double delta) {
            maxv = 1;
            for (int i = 0; i < msize / 2; i++) {
                wave[i] = (int)(wave[i] * (1 - delta + 2.0 * rand() / RAND_MAX));
            }
            for (int i = 0; i < msize / 2; i++) {
                maxv = std::max(maxv, abs(wave[i] * 1.0));
            }
        }
        double Time() {
            return msize / sample / ch / bit8;
        }
        int Getch() {
            return this->ch;
        }
        int TtoB(int ms) {
            return ms * bit8 * sample * ch / 1000;
        }
        private:
            std::string fname;
            int sample;
            int ch;
            int bit8;
            int fileSize;
            int fsize;
            int vol_min = -32768;
            int vol_max = 32767;
            struct FT
            {
                Complex* FFT(Complex* ip, int len)
                {
                    int* reBitArray = new int[len];
                    int arraySizeHarf = len >> 1;
                    reBitArray[0] = 0;
                    for (int i = 1; i < len; i <<= 1)
                    {
                        for (int j = 0; j < i; ++j)
                            reBitArray[j + i] = reBitArray[j] + arraySizeHarf;
                        arraySizeHarf >>= 1;
                    }
                    Complex* ot = new Complex[len];
                    // バタフライ演算のための置き換え
                    for (int i = 0; i < len; ++i)
                    {
                        ot[i] = ip[reBitArray[i]];
                    }
                    delete[] reBitArray;
                    delete[] ip;
                    Complex tmp;
                    int jp;
                    int butterflyDistance;
                    int numType;
                    int butterflySize;
                    Complex w;
                    Complex u;
                    int rz = (int)(log(len) / log(2));
                    // バタフライ演算
                    for (int stage = 1; stage <= rz; ++stage)
                    {
                        butterflyDistance = 1 << stage;
                        numType = butterflyDistance >> 1;
                        butterflySize = butterflyDistance >> 1;
                        w.Re = 1;
                        w.Im = 0;
                        u.Re = cos(PI / butterflySize);
                        u.Im = sin(PI / butterflySize);
                        for (int type = 0; type < numType; ++type)
                        {
                            for (int j = type; j < len; j += butterflyDistance)
                            {
                                jp = j + butterflySize;
                                tmp = ot[jp] * w;
                                ot[jp] = ot[j] - tmp;
                                ot[j] += tmp;
                            }
                            w *= u;
                        }
                    }
                    return ot;
                }
                Complex* IFFT(Complex* ip, int len)
                {
                    for (int i = 0; i < len; ++i)
                    {
                        ip[i].Im = -ip[i].Im;
                    }
                    ip = FFT(ip, len);
                    for (int i = 0; i < len; ++i)
                    {
                        ip[i].Re /= len;
                        ip[i].Im /= -len;
                    }
                    return ip;
                }
            };
            void WriteN(int num, int start, int end)
            {
                int tmp;
                for (int i = end; i >= start; --i)
                {
                    tmp = floor(num / pow(256, i - start));
                    if (tmp < 0) {
                        fmt[i] = tmp - 128;
                        num -= (int)((fmt[i] + 256) * pow(256, i - start));
                    }
                    else {
                        fmt[i] = tmp;
                        num -= (int)(fmt[i] * pow(256, i - start));
                    }
                }
            }
            int* BtoI(char* x, int start, int len)
            {
                int* rt = new int[(len - start) / 2];
                for (int i = start; i < len; i += 2)
                {
                    if (x[i] < 0)
                    {
                        rt[(i - start) / 2] = x[i + 1] * 256 + x[i] + 256;
                    }
                    else
                    {
                        rt[(i - start) / 2] = x[i + 1] * 256 + x[i];
                    }
                }
                return rt;
            }
            char* ItoB(int* cmp, double mult, int cl)
            {
                char* rt = new char[cl * 2];
                for (int i = 0; i < cl; ++i)
                {
                    if (cmp[i] < 0) {
                        rt[i * 2 + 1] = std::max(cmp[i] * mult, vol_min + 0.0) / 256;
                        rt[i * 2] = cmp[i] * mult - rt[i * 2 + 1] * 256;

                    }
                    else {
                        rt[i * 2 + 1] = std::min(cmp[i] * mult, vol_max + 0.0) / 256;
                        rt[i * 2] = cmp[i] * mult - rt[i * 2 + 1] * 256;
                    }
                }
                return rt;
            }
            int ReadN(char* bf, int start, int end)
            {
                int rt = 0;
                for (int i = end; i >= start; --i)
                {
                    if (bf[i] < 0) {
                        rt += (int)((bf[i] + 256) * pow(256, i - start));
                    }
                    else {
                        rt += (int)(bf[i] * pow(256, i - start));
                    }
                }
                return rt;
            }
            int Pchange(double pitch)
            {
                double sp = PITCH(pitch);
                maxv = 1;
                long ts = (long)(TOCH(msize / 2 / sp));
                int* rt = new int[ts];
                for (int i = 0;i < ts;i++) {
                    rt[i] = 0;
                }
                int tmp;
                for (long i = 0; i < ts - 4; i += 2)
                {
                    tmp = (int)TOCH(i * sp);
                    rt[i] = wave[tmp];
                    rt[i + 1] = wave[tmp + 1];
                }
                delete[] wave;
                wave = new int[ts];
                for (int i = 0;i < ts;i++) {
                    wave[i] = rt[i];
                    maxv = std::max(maxv, abs(1.0 * rt[i]));
                }
                delete[] rt;
                return ts;
            }
    };