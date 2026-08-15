function pow10(power) {
            let result = 1n;

            for (let i = 0; i < power; i++) {
                result *= 10n;
            }

            return result;
        }

        function pow3(power) {
            let result = 1n;

            for (let i = 0; i < power; i++) {
                result *= 3n;
            }

            return result;
        }

        function getCountForDigit(digitCount) {
            return pow10(digitCount)
                - 2n * pow3(2 * digitCount - 1);
        }

        function countForDigit(
            digit,
            remainingDigits,
            hasThreeInPreviousDigits
        ) {
            if (hasThreeInPreviousDigits) {
                return BigInt(digit) * pow10(remainingDigits);
            }

            if (digit >= 4) {
                return BigInt(digit - 1)
                    * getCountForDigit(remainingDigits)
                    + pow10(remainingDigits);
            }

            return BigInt(digit)
                * getCountForDigit(remainingDigits);
        }

        function countNabeNumbers(number) {
            let digitSum = 0n;
            let count = 0n;
            let hasThreeInPreviousDigits = false;

            const numberString = number.toString();

            for (
                let position = 0;
                position < numberString.length;
                position++
            ) {
                const currentDigit =
                    Number(numberString[position]);

                if (position !== numberString.length - 1) {
                    digitSum += BigInt(currentDigit);

                    const remainingDigits =
                        numberString.length - position - 1;

                    count += countForDigit(
                        currentDigit,
                        remainingDigits,
                        hasThreeInPreviousDigits
                    );

                    if (currentDigit === 3) {
                        hasThreeInPreviousDigits = true;
                    }
                }
                else {
                    const digitSumRemainder =
                        digitSum % 3n;

                    if (hasThreeInPreviousDigits) {
                        count += BigInt(currentDigit + 1);
                    }
                    else {
                        for (
                            let lastDigit = 0;
                            lastDigit <= currentDigit;
                            lastDigit++
                        ) {
                            if (
                                lastDigit === 3 ||
                                (
                                    BigInt(lastDigit)
                                    + digitSumRemainder
                                ) % 3n === 0n
                            ) {
                                count++;
                            }
                        }
                    }
                }
            }

            count--;

            return count;
        }
const cal_dig = 10;
const s_dig = 2;
        document
            .getElementById("calculateButton")
            .addEventListener("click", () => {
                const input =
                    document.getElementById("numberInput").value.trim();

                const result =
                    document.getElementById("result");

                // 0以上の整数か確認
                if (!/^\d+$/.test(input)) {
                    result.textContent = "無効な入力です。";
                    return;
                }

                const number = BigInt(input);
				let res = countNabeNumbers(number).toString();
                result.innerHTML =
                    "回数：" + res + "<br>(" + (100 * Number(res.slice(0, cal_dig)) / Number(input.slice(0, cal_dig))).toFixed(s_dig) + " %)";
            });