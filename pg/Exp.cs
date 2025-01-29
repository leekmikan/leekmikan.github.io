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
        if (Y < 1)
        {
            return Ud(new Exp(this.num * Math.Pow(10, 10 * (Y % 1)), this.e));
        }
        else
        {
            Y--;
            Exp Z = Ud(new Exp(this.num, this.e + 1));
            return Ud(new Exp(Z.num * Math.Pow(10, 10 * (Y % 1)), Z.e + (int)Math.Floor(Y)));
        }
    }
    //階乗(スターリングの公式)
    public Exp Stirling()
    {
        return (new Exp(Math.Log10(2 * Math.PI), 0) * this).Sqr(new Exp(Math.Log10(2), 0)) * (this / new Exp(Math.Log10(Math.E), 0)).Pow(this);
    }
    /// <summary>
    /// 文字列変換
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
    string[] nname = {"","万","億","兆","京","垓","秭","穣","溝","澗","正","載","極","恒河沙","阿僧祇","那由他","不可思議","無量大数","矜羯羅","阿伽羅","最勝","摩婆羅","阿婆羅","多婆羅","界分","普摩","禰摩","阿婆鈐","弥伽婆","毘攞伽","毘伽婆","僧羯邏摩","毘薩羅","毘贍婆","毘盛伽","毘素陀","毘婆訶","毘薄底","毘佉擔","称量","一持","異路","顛倒","三末耶",
"毘睹羅","奚婆羅","伺察","周広","高出","最妙","泥羅婆","訶理婆","一動","訶理蒲","訶理三","奚魯伽","達攞歩陀","訶魯那","摩魯陀","懺慕陀","瑿攞陀","摩魯摩","調伏","離憍慢","不動","極量","阿麼怛羅","勃麼怛羅","伽麼怛羅","那麼怛羅","奚麼怛羅","鞞麼怛羅","鉢羅麼怛羅","尸婆麼怛羅","翳羅","薜羅","諦羅","偈羅","窣歩羅","泥羅","計羅","細羅",
"睥羅","謎羅","娑攞荼","謎魯陀","契魯陀","摩睹羅","娑母羅","阿野娑","迦麼羅","摩伽婆","阿怛羅","醯魯耶","薜魯婆","羯羅波","訶婆婆","毘婆羅","那婆羅","摩攞羅","娑婆羅","迷攞普","者麼羅","駄麼羅","鉢攞麼陀","毘迦摩","烏波跋多","演説","無尽","出生","無我","阿畔多","青蓮華","鉢頭摩","僧祇","趣","至","阿僧祇","阿僧祇転","無量","無量転",
"無辺","無辺転","無等","無等転","不可数","不可数転","不可称","不可称転","不可思","不可思転","不可量","不可量転","不可説","不可説転","不可説不可説","不可説不可説転"};
    int max_pow_l = 10;
    public string Textj()
    {
        return Textj(this,0)
    }
    private string Textj(Exp X,int pow_l)
    {
        if (pow_l > max_pow_l)
        {
            return "...";
        }
        if (X.num <= EXP_ZERO)
        {
            return "0";
        }
        else if (X.num <= 0)
        {
            return X.Textf();
        }
        for (int i = nname.length - 1; i >= 0; i--)
        {
            if (i <= 17)
            {
                if (X.num >= i * 4 && X.e == 0)
                {
                    if ((X / Ud(new Exp(i * 4, 0)) > new Exp(4, 0))
                    {
                        return (X / Ud(new Exp(i * 4, 0)).Textj(pow_l + 1) + nname[i];
                    }
                    else
                    {
                        return (X / Ud(new Exp(i * 4, 0)).Textf() + nname[i];
                    }
                }
            }
            else
            {
                Exp tmp = Ud(new Exp(Math.Log10(112) + (i - 18) * Math.Log10(2), 1));
                if (X > tmp)
                {
                    return "1" + nname[i] + "<sup>" + Log(X, tmp).Textj(pow_l + 1) + "</sup>";
                }
            }
        }
    }
}