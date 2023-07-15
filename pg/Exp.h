#pragma once
#include <math.h>
#include <string>
#define EXP_ZERO -10000000
#define JAVASCRIPT_INFINITY Exp(log10(2) * 1024,0)
#define ZERO Exp(EXP_ZERO,0)
struct Exp
{
	double num;
	int e;
	Exp(double num, int e) {
		this->num = num;
		this->e = e;
		if (num != EXP_ZERO) {
			Exp tmp = this->Ud();
			this->num = tmp.num;
			this->e = tmp.e;
		}
	}
	~Exp() {}
	Exp() {
		this->num = -INFINITY;
		this->e = 0;
	}
	Exp operator +(Exp Y) {
		if (this->e == Y.e + 1 && this->e < 1000) {
			Y = Y.Up();
		}
		if (this->e == 0 && Y.e == 0 && abs(this->num - Y.num) < cl) {
			return (this->_Sum(Y)).Ud();
		}
		else if ((this->e < Y.e) || (this->e == Y.e && this->num < Y.num)) {
			return Y;
		}
		else {
			return *this;
		}
	}
	Exp _Sum(Exp Y) {
		return Exp(this->num + Log10(1 + pow(10, Y.num - this->num)), this->e);
	}
	Exp operator -(Exp Y) {
		if (this->e == Y.e + 1 && this->e < 1000) {
			Y = Y.Up();
		}
		if (this->e == 0 && Y.e == 0 && this->num - Y.num < cl && this->num > Y.num) {
			return (this->_Sub(Y)).Ud();
		}
		else if ((this->e == Y.e && this->num < Y.num) || this->e < Y.e) {
			return Exp(EXP_ZERO, 0);
		}
		else {
			return *this;
		}
	}
	Exp _Sub(Exp Y) {
		return Exp(this->num + Log10(1 - pow(10, Y.num - this->num)), this->e);
	}
	Exp operator *(Exp Y) {
		if (this->e >= 1 && Y.e >= 1) {
			Exp Z;
			if (this->e == 0) {
				Z = Exp(Log10(this->num), 0);
			}
			else {
				Z = Exp(this->num, this->e - 1);
			}
			Exp W;
			if (Y.e == 0) {
				W = Exp(Log10(Y.num), 0);
			}
			else {
				W = Exp(Y.num, Y.e - 1);
			}
			Z = Z + W;
			return (Exp(Z.num, Z.e + 1)).Ud();
		}
		else {
			if (this->e != Y.e && this->e == Y.e + 1 && this->e < 1000) {
				Y = Y.Up();
			}
			if (this->num <= EXP_ZERO || Y.num <= EXP_ZERO) {
				return Exp(EXP_ZERO, 0);
			}if (this->e == 0 && Y.e == 0) {
				return (this->_Mul(Y)).Ud();
			}
			else if (this->e < Y.e) {
				return Y;
			}
			else {
				return *this;
			}
		}
	}
	// x^yを計算
	Exp Pow(Exp Y) {
		Exp Z;
		if (this->e == 0) {
			Z = Exp(Log10(this->num), 0);
		}
		else {
			Z = Exp(this->num, this->e - 1);
		}
		Z = Z * Y;
		return (Exp(Z.num, Z.e + 1)).Ud();
	}
	// x^(1/y)を計算
	Exp Sqr(Exp Y) {
		Exp Z;
		if (this->e == 0) {
			Z = Exp(Log10(this->num), 0);
		}
		else {
			Z = Exp(this->num, this->e - 1);
		}
		Z = Z / Y;
		return (Exp(Z.num, Z.e + 1)).Ud();
	}
	// log[y](x)を計算
	Exp Log(Exp Y) {
		Exp Z;
		if (this->e == 0) {
			Z = Exp(Log10(this->num), 0);
			Z = Z;
		}
		else {
			Z = Exp(this->num, this->e - 1);
		}
		Exp W;
		if (Y.e == 0) {
			W = Exp(Log10(Y.num), 0);
		}
		else {
			W = Exp(Y.num, Y.e - 1);
		}
		Z = Z / W;
		return Z.Ud();
	}
	Exp operator /(Exp Y) {
		Exp X = *this;
		if (Y.e == 0 && Y.num == 0) {
			return *this;
		}
		if (this->e >= 1 && Y.e >= 1) {
			Exp Z;
			if (this->e == 0) {
				Z = Exp(Log10(this->num), 0);
			}
			else {
				Z = Exp(this->num, this->e - 1);
			}
			Exp W;
			if (Y.e == 0) {
				W = Exp(Log10(Y.num), 0);
			}
			else {
				W = Exp(Y.num, Y.e - 1);
			}
			Z = Z - W;
			return (Exp(Z.num, Z.e + 1)).Ud();
		}
		else {
			if (X.e != Y.e && X.e == Y.e + 1 && X.e < 1000) {
				Y = Y.Up();
			}
			else if (X.e != Y.e && Y.e == X.e + 2 && X.e < 1000) {
				X = X.Up();
			}
			if (X.num <= EXP_ZERO || Y.num <= EXP_ZERO) {
				return Exp(EXP_ZERO, 0);
			}if (X.e == 0 && Y.e == 0) {
				return (X._Div(Y)).Ud();
			}
			else if (X.e < Y.e) {
				return Y;
			}
			else {
				return X;
			}
		}
	}
	Exp _Mul(Exp Y) {
		return Exp(this->num + Y.num, this->e);
	}
	Exp _Div(Exp Y) {
		return Exp(this->num - Y.num, this->e);
	}
	Exp Up() {
		return Exp(Log10(this->num), this->e + 1);
	}
	Exp Ud() {
		if (this->num < -cl && this->e == 0) {
			return Exp(EXP_ZERO, 0);
		}
		else if (this->num < 0 && this->e != 0) {
			this->e--;
			this->num = pow(10, this->num);
		}
		else if (this->num > 10000000000) {
			this->e++;
			this->num = Log10(this->num);
		}
		else if (this->num < 10 && this->e != 0) {
			this->e--;
			this->num = pow(10, this->num);
		}
		return *this;
	}
	bool operator >(Exp Y) {
		Exp _X = (Exp(this->num, this->e)).Ud();
		Exp _Y = (Exp(Y.num, Y.e)).Ud();
		if (_X.e > _Y.e || (_X.e == _Y.e && _X.num > _Y.num)) {
			return true;
		}
		else {
			return false;
		}
	}
	bool operator <(Exp Y) {
		return !(*this > Y);
	}
	bool operator >=(Exp Y) {
		return (*this > Y || *this == Y);
	}
	bool operator <=(Exp Y) {
		return (!(*this > Y) || *this == Y);
	}
	bool operator ==(Exp Y) {
		return (this->num == Y.num && this->e == Y.e);
	}
	//四捨五入
	Exp Round() {
		if (this->num < cl && this->e == 0) {
			return (Exp(Log10(round(pow(10, this->num))), this->e)).Ud();
		}
		return *this;
	}
	//切り上げ
	Exp Ceil() {
		if (this->num < cl && this->e == 0) {
			return (Exp(Log10(ceil(pow(10, this->num))), this->e)).Ud();
		}
		return *this;
	}
	//切り捨て
	Exp Floor() {
		if (this->num < cl && this->e == 0) {
			return (Exp(Log10(floor(pow(10, this->num))), this->e)).Ud();
		}
		return *this;
	}
	//階乗(スターリングの公式)
	Exp Stirling() {
		return (Exp(log10(2 * 3.141592653), 0) * *this).Sqr(Exp(log10(2), 0)) * (*this / Exp(log10(2.718281828), 0)).Pow(*this);
	}
	/// <summary>
	/// 文字列変換
	/// eg.123,12.4Qa,7.7e155,ee3.1e4,10↑↑192
	/// </summary>
	/// <returns>
	/// <para> 通常表記 (~1000) </para>
	/// <para> 接頭語[K~No]表記 (~1e33) </para>
	/// <para> 指数表記 (~eeeeeeeeeee1) </para>
	/// <para> クヌースの矢印表記(eeeeeeeeeee1~) </para>
	/// </returns>
	std::string Text() {
		if (this->num <= EXP_ZERO) {
			return "0";
		}
		else if (this->e == 0 && this->num < 6) {
			return std::to_string(pow(10.0, this->num));
		}
		else if (this->e == 0 && this->num < 33) {
			return std::to_string(pow(10.0, this->num - floor(this->num / 3) * 3)) +  " " + letter[(int)floor(this->num / 3)];
		}
		else if (this->e == 0) {
			return std::to_string(pow(10.0, this->num - floor(this->num))) + "e" + std::to_string((int)floor(this->num));
		}
		else if (this->e >= 8) {
			return "10↑↑" + std::to_string(this->e + 2);
		}
		else {
			std::string rt = "";
			for (int i = 0; i < this->e; i++) {
				rt += "e";
			}
			return rt + std::to_string(pow(10.0, this->num - floor(this->num))) + "e" + std::to_string((int)floor(this->num));
		}
	}
	//負防止対数
	double Log10(double x) {
		if (x <= 0) return EXP_ZERO;
		else return log10(x);
	}
	private:
		std::string letter[11] = { "", "K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No" };
		int cl = 3;
};