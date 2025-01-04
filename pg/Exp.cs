public class Exp
{
    private static int cl = 3; //有効数字の桁数
    const double EXP_ZERO = -100000;
    public double num;
    public int e;
    public Exp(double num, int e)
    {
        this.num = num;
        this.e = e;
        if (num != EXP_ZERO)
        {
            Exp tmp = Ud(this);
            this.num = tmp.num;
            this.e = tmp.e;
        }
    }
    ~Exp() { }
    public Exp()
    {
        this.num = Double.NegativeInfinity;
        this.e = 0;
    }
    public static Exp operator +(Exp X, Exp Y)
    {
        if (X.e == Y.e + 1 && X.e < 1000)
        {
            Y = Up(Y);
        }
        if (X.e == 0 && Y.e == 0 && Math.Abs(X.num - Y.num) < cl)
        {
            return Ud(_Sum(X, Y));
        }
        else if ((X.e < Y.e) || (X.e == Y.e && X.num < Y.num))
        {
            return Y;
        }
        else
        {
            return X;
        }
    }
    private static Exp _Sum(Exp X, Exp Y)
    {
        return new Exp(X.num + Math.Log10(1 + Math.Pow(10, Y.num - X.num)), X.e);
    }
    public static Exp operator -(Exp X, Exp Y)
    {
        if (X.e == Y.e + 1 && X.e < 1000)
        {
            Y = Up(Y);
        }
        if (X.e == 0 && Y.e == 0 && X.num - Y.num < cl && X.num > Y.num)
        {
            return Ud(_Sub(X, Y));
        }
        else if ((X.e == Y.e && X.num <= Y.num) || X.e < Y.e)
        {
            return new Exp(EXP_ZERO, 0);
        }
        else
        {
            return X;
        }
    }
    private static Exp _Sub(Exp X, Exp Y)
    {
        return new Exp(X.num + Math.Log10(1 - Math.Pow(10, Y.num - X.num)), X.e);
    }
    public static Exp operator *(Exp X, Exp Y)
    {
        if (X.e >= 1 && Y.e >= 1)
        {
            Exp Z;
            if (X.e == 0)
            {
                Z = new Exp(Math.Log10(X.num), 0);
            }
            else
            {
                Z = new Exp(X.num, X.e - 1);
            }
            Exp W;
            if (Y.e == 0)
            {
                W = new Exp(Math.Log10(Y.num), 0);
            }
            else
            {
                W = new Exp(Y.num, Y.e - 1);
            }
            Z = Z + W;
            return Ud(new Exp(Z.num, Z.e + 1));
        }
        else
        {
            if (X.e != Y.e && X.e == Y.e + 1 && X.e < 1000)
            {
                Y = Up(Y);
            }
            if (X.num <= EXP_ZERO || Y.num <= EXP_ZERO)
            {
                return new Exp(EXP_ZERO, 0);
            }
            if (X.e == 0 && Y.e == 0)
            {
                return Ud(_Mul(X, Y));
            }
            else if (X.e < Y.e)
            {
                return Y;
            }
            else
            {
                return X;
            }
        }
    }
    // x^yを計算
    public Exp Pow(Exp Y)
    {
        Exp Z;
        if (this.e == 0)
        {
            if (this.num <= 0)
            {
                if (Y.e == 0)
                {
                    return Ud(new Exp(this.num * Math.Pow(10, Y.num), 0));
                }
                else
                {
                    return new Exp(EXP_ZERO, 0);
                }
            }
            Z = new Exp(Math.Log10(this.num), 0);
        }
        else
        {
            Z = new Exp(this.num, this.e - 1);
        }
        Z = Z * Y;
        return Ud(new Exp(Z.num, Z.e + 1));
    }
    // x^(1/y)を計算
    public Exp Sqr(Exp Y)
    {
        Exp Z;
        if (this.e == 0)
        {
            if (this.num <= 0)
            {
                if (Y.e == 0)
                {
                    return Ud(new Exp(this.num / Math.Pow(10, Y.num), 0));
                }
                else
                {
                    return new Exp(0, 0);
                }
            }
            Z = new Exp(Math.Log10(this.num), 0);
        }
        else
        {
            Z = new Exp(this.num, this.e - 1);
        }
        Z = Z / Y;
        return Ud(new Exp(Z.num, Z.e + 1));
    }
    // log[y](x)を計算
    public Exp Log(Exp Y)
    {
        Exp Z;
        if (this.e == 0)
        {
            if (this.num <= 0)
            {
                return new Exp(EXP_ZERO, 0);
            }
            Z = new Exp(Math.Log10(this.num), 0);
        }
        else
        {
            Z = new Exp(this.num, this.e - 1);
        }
        Exp W;
        if (Y.e == 0)
        {
            W = new Exp(Math.Log10(Y.num), 0);
        }
        else
        {
            W = new Exp(Y.num, Y.e - 1);
        }
        Z = Z / W;
        return Ud(Z);
    }
    public static Exp operator /(Exp X, Exp Y)
    {
        if (Y.e == 0 && Y.num == 0)
        {
            return X;
        }
        if (X.e >= 1 && Y.e >= 1)
        {
            Exp Z;
            if (X.e == 0)
            {
                Z = new Exp(Math.Log10(X.num), 0);
            }
            else
            {
                Z = new Exp(X.num, X.e - 1);
            }
            Exp W;
            if (Y.e == 0)
            {
                W = new Exp(Math.Log10(Y.num), 0);
            }
            else
            {
                W = new Exp(Y.num, Y.e - 1);
            }
            Z = Z - W;
            return Ud(new Exp(Z.num, Z.e + 1));
        }
        else
        {
            if (X.e != Y.e && X.e == Y.e + 1 && X.e < 1000)
            {
                Y = Up(Y);
            }
            else if (X.e != Y.e && Y.e == X.e + 2 && X.e < 1000)
            {
                X = Up(X);
            }
            if (X.num <= EXP_ZERO || Y.num <= EXP_ZERO)
            {
                return new Exp(EXP_ZERO, 0);
            }
            if (X.e == 0 && Y.e == 0)
            {
                return Ud(_Div(X, Y));
            }
            else if (X.e < Y.e)
            {
                return Y;
            }
            else
            {
                return X;
            }
        }
    }
    private static Exp _Mul(Exp X, Exp Y)
    {
        return new Exp(X.num + Y.num, X.e);
    }
    private static Exp _Div(Exp X, Exp Y)
    {
        return new Exp(X.num - Y.num, X.e);
    }
    private static Exp Up(Exp X)
    {
        return new Exp(Math.Log10(X.num), X.e + 1);
    }
    private static Exp Ud(Exp X)
    {
        if (X.num < -cl && X.e == 0)
        {
            return new Exp(EXP_ZERO, 0);
        }
        else if (X.num < 10 && X.e != 0)
        {
            X.e--;
            X.num = Math.Pow(10, X.num);
        }
        else if (X.num > 10000000000)
        {
            X.e++;
            X.num = Math.Log10(X.num);
        }
        return X;
    }
    public static bool operator >(Exp X, Exp Y)
    {
        Exp _X = Ud(new Exp(X.num, X.e));
        Exp _Y = Ud(new Exp(Y.num, Y.e));
        if (_X.e > _Y.e || (_X.e == _Y.e && _X.num > _Y.num))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public static bool operator <(Exp X, Exp Y)
    {
        return !(X > Y);
    }
    public static bool operator >=(Exp X, Exp Y)
    {
        return (X > Y || X == Y);
    }
    public static bool operator <=(Exp X, Exp Y)
    {
        return (!(X > Y) || X == Y);
    }
    public static bool operator ==(Exp X, Exp Y)
    {
        return (X.num == Y.num && X.e == Y.e);
    }
    public static bool operator !=(Exp X, Exp Y)
    {
        return !(X.num == Y.num && X.e == Y.e);
    }
    //四捨五入
    public Exp Round()
    {
        if (this.num < cl && this.e == 0)
        {
            return Ud(new Exp(Math.Log10(Math.Round(Math.Pow(10, this.num))), this.e));
        }
        return this;
    }
    //切り上げ
    public Exp Ceil()
    {
        if (this.num < cl && this.e == 0)
        {
            return Ud(new Exp(Math.Log10(Math.Ceiling(Math.Pow(10, this.num))), this.e));
        }
        return this;
    }
    //切り捨て
    public Exp Floor()
    {
        if (this.num < cl && this.e == 0)
        {
            return Ud(new Exp(Math.Log10(Math.Floor(Math.Pow(10, this.num))), this.e));
        }
        return this;
    }
    public Exp Tow(double Y)
    {
        return Ud(new Exp(this.num * Math.Pow(10, 10 * (Y % 1)), this.e + (int)Math.Floor(Y)));
    }
    //階乗(スターリングの公式)
    public Exp Stirling()
    {
        return (new Exp(Math.Log10(2 * Math.PI), 0) * this).Sqr(new Exp(Math.Log10(2), 0)) * (this / new Exp(Math.Log10(Math.E), 0)).Pow(this);
    }
    /// <summary>
    /// 文字列変換
    /// eg.123,12.4Qa,7.7e155,ee3.1e4,10↑↑192
    /// </summary>
    /// <returns>
    /// <para> 通常表記 (~1000) </para>
    /// <para> 指数表記 (~eeeeeeeeeee1) </para>
    /// <para> クヌースの矢印表記(eeeeeeeeeee1~) </para>
    /// </returns>
    public string Textf()
    {
        if (this.num <= EXP_ZERO)
        {
            return "0";
        }
        else if (this.e == 0 && this.num < 10)
        {
            return Math.Pow(10.0, this.num).ToString();
        }
        else if (this.e >= 8)
        {
            return "10↑↑" + Math.Round((this.e + 2 + (Math.Log10(this.num) - 1) / 9) * Math.Pow(10, cl)) / Math.Pow(10, cl);
        }
        else
        {
            string rt = "";
            for (int i = 0; i < this.e; i++)
            {
                rt += "e";
            }
            return rt + Math.Floor(Math.Pow(10.0, this.num - Math.Floor(this.num)) * Math.Pow(10, cl)) / Math.Pow(10, cl) + "e" + (int)Math.Floor(this.num);
        }
    }
    /// <summary>
    /// 文字列変換　通常表記のときは整数
    /// eg.123,12.4Qa,7.7e155,ee3.1e4,10↑↑192
    /// </summary>
    /// <returns>
    /// <para> 通常表記 (~1000) </para>
    /// <para> 指数表記 (~eeeeeeeeeee1) </para>
    /// <para> クヌースの矢印表記(eeeeeeeeeee1~) </para>
    /// </returns>
    public string Textn()
    {
        if (this.num <= EXP_ZERO)
        {
            return "0";
        }
        else if (this.e == 0 && this.num < 10)
        {
            return ((int)Math.Round(Math.Pow(10.0, this.num))).ToString();
        }
        else if (this.e >= 8)
        {
            return "10↑↑" + Math.Round((this.e + 2 + (Math.Log10(this.num) - 1) / 9) * Math.Pow(10, cl)) / Math.Pow(10, cl);
        }
        else
        {
            string rt = "";
            for (int i = 0; i < this.e; i++)
            {
                rt += "e";
            }
            return rt + Math.Floor(Math.Pow(10.0, this.num - Math.Floor(this.num)) * Math.Pow(10, cl)) / Math.Pow(10, cl) + "e" + (int)Math.Floor(this.num);
        }
    }
}