'use strict';
const hashCodeMap = {'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'0':48,'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,'l':108,'m':109,'n':110,'o':111,
'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,'w':119,'x':120,'y':121,'z':122,'~':126,'!':33,'@':64,'#':35,'$':36,'%':37,'^':94,'&':38,'*':42,'(':40,')':41,'`':96,'[':91,']':93,';':59,'\'':39,'-':45,'_':95,'"':34,'\\':92,',':44,'.':46,'/':47,'{':123,'}':125,':':58,'|':124,'<':60,'>':62,'?':63};

const oriTable = "1234567890abcdefghijklmnopqrstuvwxyz";
const encodeTable = "ijklnoqpmrwygxzsefhacdb3412657890vtu";
const symbol = "~!@#$%^&*()`[];'-_\"\\,./{}:|<>?";
const symbolTable = "ABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZABK";

const DEFAULT_PAGE_NUM = 12


module.exports = {
    /**
     * 分页设置
     * 
     * @param baseForm
     */
    processPageNum(baseForm) {
        let pageNum = baseForm.pageNum || 1;
        let pageSize = baseForm.pageSize || DEFAULT_PAGE_NUM
        let firstResult = 0;
        // pageSize>100,则取默认每页大小.
        if (pageSize > 100) {
            pageSize = DEFAULT_PAGE_NUM;
        }
        // 如果当前页码，大于总页数，将当前页码置为最后一页
        // if (baseForm.getTotalRecords() != -1) {
        //     int totalPageNum = (baseForm.getTotalRecords() + pageSize - 1) / pageSize;
        //     if (totalPageNum == 0) {
        //         baseForm.setPageNum(1);
        //     }
        //     else if (pageNum > totalPageNum) {
        //         baseForm.setPageNum(totalPageNum);
        //     }
        // }
        // 重新计算分页的开始数量
        firstResult = (Number(pageNum) - 1) * pageSize;
        return {
            pageNum: Number(pageNum),
            pageSize: Number(pageSize),
            firstResult: firstResult,
            maxResult: Number(pageSize)
        }
    },
    /**
     * 排序设置
     * 
     * @param baseForm
     * @param defaultOrderField
     * @param defaultOrderMode
     * @return
     */
    processPageOrder(defaultOrderField, defaultOrderMode) {
        let orderField;
        let orderByMode;
        if (!defaultOrderField) {
            orderField = null;
        } else {
            orderField = defaultOrderField
        }
        if (defaultOrderMode) {
            let mode = defaultOrderMode.toLocaleLowerCase()
            orderByMode = ['desc', 'asc'].indexOf(mode) != -1 ? mode : 'desc'
        } else {
            orderByMode = 'desc'
        }
        return {
            orderField,
            orderByMode
        }
    },
    decrypt: function(encodeText) {
		var result = "";
        var i = 0;
        encodeText = "" + encodeText.charAt(encodeText.length - 1) + encodeText.substring(1, encodeText.length - 1) + encodeText.charAt(0);
        var decodedText = "";
        for (i = 0; i < encodeText.length; i += 2) {
            if (encodeText.length > i + 1) {
                decodedText = "" + decodedText + encodeText.charAt(i + 1);
                decodedText = "" + decodedText + encodeText.charAt(i);
            } else {
                decodedText = "" + decodedText + encodeText.charAt(i);
            }
        }
        for (i = 0; i < symbolTable.length; i += 2) {
            var sym = symbolTable.substring(i, i + 2);
            if (decodedText.indexOf(sym) >= 0) {
			    var rTxt = symbol.substring(i / 2, (i / 2) + 1);
				var reg = new RegExp(sym, 'g');
				decodedText = decodedText.replace(reg, rTxt);
            }
        }
        encodeText = decodedText;
        decodedText = "";
        for (i = 0; i < encodeText.length; i++) {
            var c = encodeText.charAt(i);
            var postion = encodeTable.indexOf(c);
            if (postion >= 0) {
                decodedText = "" + decodedText + oriTable.charAt(postion);
            } else {
                decodedText = "" + decodedText + c;
            }
        }
        var tmpArray = decodedText.split("|", 2);
        var specCode = parseInt(tmpArray[0]);
        decodedText = tmpArray[1];
        var specCodeUnCheck = 0;
        for (i = 0; i < decodedText.length; i++) {
		    var hashKey = decodedText.substring(i, i + 1);
			var hashCode = hashCodeMap[hashKey];
            specCodeUnCheck += hashCode;
        }
        var specString = "" + specCodeUnCheck;
        if (specString.length > 1) {
            specString = specString.substring(specString.length - 1, specString.length) + specString.substring(1, specString.length - 1) + specString.substring(0, 1);
        }
        if (parseInt(specString) == specCode) {
			result = "" + decodedText.charAt(decodedText.length - 1) + decodedText.substring(0, decodedText.length - 1);
        }
		return result;
    },
    encrypt: function(unencodeText) {
        var encodedText = "";
		unencodeText = (unencodeText).toString().toLowerCase();
		var newString = "";
		newString = newString + unencodeText.substring(1, unencodeText.length);
		newString = newString + unencodeText.charAt(0);
		unencodeText = newString;
		newString = "";
		var specCode = 0;

		for (var specString = 0; specString < unencodeText.length; ++specString) {
            var hashKey = unencodeText.substring(specString, specString + 1);
			var hashCode = hashCodeMap[hashKey];
            specCode += hashCode;
		}

		var arg13 = specCode.toString();
		if (arg13.length > 1) {
			arg13 = arg13.substring(arg13.length - 1, arg13.length) + arg13.substring(1, arg13.length - 1)
					+ arg13.substring(0, 1);
		}

		unencodeText = arg13 + "|" + unencodeText;

		var i;
		var c1;
		var c11;
		for (i = 0; i < unencodeText.length; ++i) {
			c1 = unencodeText.charAt(i);
			c11 = oriTable.indexOf(c1);
			if (c11 >= 0) {
				var newChar = encodeTable.charAt(c11);
				encodedText = encodedText + newChar;
			} else {
				encodedText = encodedText + c1;
			}
		}

		unencodeText = encodedText;
		encodedText = "";

		for (i = 0; i < unencodeText.length; ++i) {
			c1 = unencodeText.charAt(i);
			c11 = symbol.indexOf(c1);
			if (c11 >= 0) {
				var arg15 = symbolTable.substring(c11 * 2, c11 * 2 + 2);
				encodedText = encodedText + arg15;
			} else {
				encodedText = encodedText + c1;
			}
		}

		newString = "";

		for (i = 0; i < encodedText.length; i += 2) {
			if (encodedText.length > i + 1) {
				c1 = encodedText.charAt(i + 1);
				newString = newString + c1;
				var arg14 = encodedText.charAt(i);
				newString = newString + arg14;
			} else {
				c1 = encodedText.charAt(i);
				newString = newString + c1;
			}
		}

		encodedText = newString;
		newString = "";
		newString = newString + encodedText.charAt(encodedText.length - 1);
		newString = newString + encodedText.substring(1, encodedText.length - 1);
		newString = newString + encodedText.charAt(0);
		return newString;
    }
};