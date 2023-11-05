const { parse, stringify } = require("vue-template-ast");

// const code = `
// <template>
//     <div @click="f">
//         Hello
//         <input name="Hello" />
//     </div>
// </template>

// <script>
// import { mapState } from "vuex";
// import CloseProjectDialog from './DialogContent/CloseProjectDialog.vue';
// import ComponentMenuDialog from './DialogContent/ComponentMenuDialog.vue';
// import DeleteComponentDialog from './DialogContent/DeleteComponentDialog.vue';
// import NewComponentDialog from './DialogContent/NewComponentDialog.vue';
// import NewProjectDialog from './DialogContent/NewProjectDialog.vue';
// import RenameComponentDialog from './DialogContent/RenameComponentDialog.vue';
// import "./Hello.js";


// export default {
//     name: "dialogComponent",

//     data() {
//         return {
//             a: 1,
//             b: 2,
//             c: {},
//             d: () => "Hello",
//             e: [],
//         };
//     },

//     methods: {
//         onDialogMaskClick(event) {
//             if (event.target === event.currentTarget) {
//                 // 如果当前用户点击的确实是 mask 的话
//                 this.$store.commit("AppState/SET_DIALOG_STATE", {
//                     // 关闭对话框
//                     show: false
//                 });
//             }
//         }
//     },

//     computed: {
//         ...mapState("AppState", {
//             dialogState: state => {
//                 return state.dialog;
//             }
//         }),

//         currentDialogComponent() {
//             // 从 vuex 中获取当前 Dialog 组件要显示的对话框内容组件
//             return this.dialogState.dialogData.dialogCompName;
//         }
//     },

//     components: {
//         NewComponentDialog,
//         DeleteComponentDialog,
//         ComponentMenuDialog,
//         RenameComponentDialog,
//         NewProjectDialog,
//         CloseProjectDialog
//     },
// }
// </script>

// <style lang="scss" scoped>
// aside {
//     height: 100%;

//     display: flex;
//     flex-direction: row;

//     .toolBar {
//         width: 48px;
//         height: 100%;

//         background-color: $barBackgroundColor;

//         border-right: 1px solid $foregroundColor;

//         display: flex;
//         flex-direction: column;
//         justify-content: flex-start;
//         align-items: center;

//         z-index: 100;

//         :deep(ul) {
//             width: 100%;
//             height: 100%;
//             list-style: none;

//             li {
//                 width: calc(100% - 3px);
//                 height: 50px;
//                 border-left: 3px solid transparent;

//                 position: relative;

//                 cursor: pointer;

//                 &:hover > span {
//                     display: block;
//                     opacity: 1;
//                 }

//                 &.active {
//                     border-left: 3px solid $actionColor;
//                 }

//                 i {
//                     font-size: 30px;
//                     color: $textColor;

//                     position: absolute;
//                     left: 50%;
//                     top: 50%;
//                     transform: translate(-50%, -50%);
//                 }

//                 span {
//                     display: block;
                    
//                     width: 40px;

//                     position: absolute;
//                     left: calc(100% + 3px);
//                     top: 50%;
//                     transform: translateY(-50%);

//                     border: 1px solid $textColor;
//                     border-radius: 3px;

//                     color: $textColor;
//                     text-align: center;
//                     font-size: 14px;

//                     opacity: 0;
//                     display: none;

//                     background-color: $backgroundColor;

//                     transition: opacity 0.2s;
//                 }
//             }
//         }

//         box-sizing: border-box;
//     }

//     .toolPanel {
//         width: 200px;
//         height: 100%;
//         background-color: $barBackgroundColor;

//         border-right: 1px solid $foregroundColor;

//         z-index: 50;
//     }
// }
// </style>
// `;



// 取出 template 标签及其中代码的正则
const templateCodeReg = /(?<templateCode><template.*?>[\w\W]*<\/template>)/g;
// 取出 script 标签及其中代码的正则
const scriptCodeReg = /(?<scriptCode><script.*?>[\w\W]*<\/script>)/g;
// 取出 style 标签及其中代码的正则
const styleCodeReg = /(?<styleCode><style.*?>[\w\W]*<\/style>)/g;



function getTemplateCode(templateCode) {
    // 从模板获取 template 中的代码
    return templateCodeReg.exec(templateCode).groups.templateCode;
}


function getScriptCode(templateCode) {
    // 从模板获取 script 中的代码
    return scriptCodeReg.exec(templateCode).groups.scriptCode;
}


function getStyleCode(templateCode) {
    // 从模板获取 style 中的代码
    return styleCodeReg.exec(templateCode).groups.styleCode;
}



function parseTemplate(templateTag) {
    // 解析模板代码的函数 这里就直接只使用第三方库提供的方法了
    // templateTag: String  包含模板代码的 template 标签

    // 模板解析器
    const templateParser = parse();

    return templateParser(templateTag);
}


function genTemplate(templateObject) {
    // 给定一个由 parseTemplate 函数生成的模板解析结果 返回一个由这个解析结果生成的模板代码字符串
    // templateObject: any[]  由 parseTemplate 函数生成的模板解析结果

    return stringify(templateObject);
}


function parseScript(scriptTag) {
    // 处理 script 中内容的函数
    // scriptTag: String  包含 script 标签的 script 代码字符串

    function parse(scriptCode) {
        // 处理 script 代码
        // scriptCode: String  需要被处理的代码

        // 匹配导入语句的正则
        const importReg = /(?<importCode>import .*)/g;
        // 匹配 data 对象的正则
        const dataReg = /data\(\)[\n\r\t ]*?{[\w\W]*?return[\n\r\t ]*/;
        // 匹配 components 对象的正则
        const componentsReg = /components:[\n\r\t ]*/;
    
        // 结果对象
        const res = {
            imports: [],
            datas: [],
            components: [],
            otherCodes: []
        };
    
    
        function spliteCode(code, codeMatchRes) {
            // 给定一段代码和一个正则匹配结果 方法将自动寻找正则匹配结果在原始 code 中的位置
            // 并自动寻找到匹配位置后的对象代码 而后自动将对象代码中的属性进行拆分
            // 拆分为多个字符串后返回
            // code: String  原始的代码字符串
            // codeMatchRes: String.match 函数返回的对象  方法根据此对象中的信息来计算要被拆分的对象的位置
    
            // 这个函数用于在后续的 "第二步: 处理 data" 和 "第三步: 处理 componets" 中
            // 将 data 和 components 对应的对象中的属性拆分为单独的字符串
    
    
            // 先计算出 codeMatchRes 对应的 key 后的 { 字符的下标
            // 计算方式很简单 就只是正则匹配位置 + 被匹配内容长度即可
            const codeObjectStartIndex = codeMatchRes.index + codeMatchRes[0].length;
    
            let codeObjectEndIndex;
    
            // 此时我们的代码包含从正则匹配位置到整个 script 代码结尾部分的代码
            // 我们需要将纯粹的需要被拆分的对象的代码提取出来
            // 但需要被拆分的对象内的情况可能会比较复杂 毕竟需要被拆分的对象内可以有普通的字符串数据
            // 也可以有对象或是函数或是一些其他东西 而对象内还可以继续套各种东西
            // 此时我们该怎么确定整个需要被拆分的对象的代码的范围?
            // 答案是使用栈
            // 不管代码套的多深 需要被拆分的对象内的括号肯定是相互匹配的
            // 一个 { 肯定对应着一个 }  于是我们就这样做: 当遇到一个 { ( [ 的时候我们就压栈
            // 当遇到 } ) ] 的时候 我们就弹栈
            // 这样一来 我们只需从需要被拆分的对象的第一个 { 开始匹配 直到栈为空时我们就知道
            // 我们已经将整个需要被拆分的对象都匹配完成了
    
            // 准备一个栈
            let stack = [];
    
            // 切分代码 将从需要被拆分的对象后的那个 { 到 整个代码字符串结束的这部分代码切分出来
            const otherCodes = code.slice(codeObjectStartIndex);
    
            // 遍历整个字符串 并依据栈来确定需要被拆分的对象结束的位置
            for (let i=0; i<otherCodes.length; i++) {
                const c = otherCodes[i];
    
                if (c === "{" || c === "(" || c === "[") {
                    stack.push(c);
                    continue;
                }
    
                if (
                    (c === "}" && stack[stack.length - 1] === "{")
                    || (c === ")" && stack[stack.length - 1] === "(")
                    || (c === "]" && stack[stack.length - 1] === "[")
                ) {
                    stack.pop();
                }
    
                if (stack.length === 0) {
                    // 栈已经为空了 此时需要被拆分的对象开始的位置 + i 就是需要被拆分的对象的结束位置
                    // + 1 是因为在后续切分字符串时 方法切取的是 [start, end) 部分内的字符串
                    codeObjectEndIndex = codeObjectStartIndex + i + 1;
                    break;
                }
            }
    
    
            // 现在我们已经找到需要被拆分的对象的位置了
            // 现在我们要做的 就是把需要被拆分的对象中的每一项都提取出来 变为一个单独的字符串
            // 这里仍存在上述的问题 就是需要被拆分的对象中可能在存储很多种类型的数据
            // 如果我们只是单纯地按照 , 来进行拆分的话 那存储在对象中的由很多属性的对象该怎么办? 它们也会被拆分掉
            // 而且 如果用户在需要被拆分的对象中存储了函数之类的内容该怎么办? 此时我们就没办法按照 , 再对 data 中的内容进行拆分了
            // 对于这个问题 我们的解决方法和上述一致 仍然是使用栈 只是在使用前我们需要进行一点小的处理
            // 就是把需要被拆分的对象返回的对象的两侧的 { 和 } 删掉
            // 删掉后我们再依靠栈进行括号的匹配 此时我们就会发现 不管当前属性套的有多深 只要当前遍历到的字符是 ,  同时栈已经空了
            // 此时我们就肯定已经遍历完一个对象中的属性了!
    
            // 将栈置空
            stack = [];
            // 切取出需要被拆分的对象的代码
            let objectCode = code.slice(codeObjectStartIndex, codeObjectEndIndex);
            // 两个指针 用于切取出需要被拆分的对象中的一个属性
            let splitedPI = 0;
            let splitedPJ = 0;
            // 存储最终处理结果的数组
            const splitedItem = [];
    
            // 首先删除 objectCode 左右两侧的 { 和 }
            objectCode = objectCode
                .trim()
                .slice(1)
                .slice(0, objectCode.length-2);
            
            // 遍历每个字符
            for (let i=0; i<objectCode.length; i++) {
                const c = objectCode[i];
    
                if (c === "{" || c === "(" || c === "[") {
                    stack.push(c);
                    // 注 这里没有再写 continue 了 因为后面还要让 splitedPJ++;
                }
    
                if (
                    (c === "}" && stack[stack.length - 1] === "{")
                    || (c === ")" && stack[stack.length - 1] === "(")
                    || (c === "]" && stack[stack.length - 1] === "[")
                ) {
                    stack.pop();
                }
    
                if (
                    (c === "," && stack.length === 0)  // 如果当前字符是 ,  同时栈中已经将所有括号都匹配了 我们就认为我们已经找到了一个完整的需要被拆分的对象中的一个属性
                    || (i === objectCode.length - 1)  // 适配对象中最后一项没有 , 的情况
                ) {
                    // 切取出 objectCode 内 [splitedPI, splitedPJ) 这部分的代码
                    const dataItem = objectCode.slice(splitedPI, splitedPJ);
                    // 清除两侧的空白字符后再存储
                    splitedItem.push(dataItem.trim());
                    // 更新指针的位置 + 1 是因为要跳过当前字符
                    splitedPI = splitedPJ + 1;
                }
    
                // 更新指针位置
                splitedPJ++;
            }
    
            // 返回处理结果
            return {
                codeObjectStartIndex,
                codeObjectEndIndex,
                splitedItem
            };
        }
        // function splitedCode
    
    
        // 第一步 处理导入 我们需要将 "import ... from ...; import ... from ...;"
        // 拆分为多个 { importThing: ..., importFrom: ... } 对象
    
        // 保存处理完的导入语句
        let importsCodeLine = [];
        let imports = importReg.exec(scriptCode);
        // 如果匹配到了
        while (imports !== null) {
            // 那就把匹配到的结果放在结果数组中
            importsCodeLine.push(imports.groups.importCode);
            // 重复寻找导入语句
            imports = importReg.exec(scriptCode);
        }
    
        importsCodeLine = importsCodeLine
            // 先将每个元素按 from 拆分  此时每个元素变为 ["import thing", "fromLibrary"]
            .map(line => line.split("from"))
            .map(splitedLine => {
                // 再取出每个子数组中的第 0 项 再根据 "import" 分割 变为 ["", "thing"]
                const importThing = splitedLine[0].split("import")[1].trim();
                // 有的导入形如 "import './a.js';" 对于这种导入语句我们是没有 from ... 的
                // 因此分割后的数组中也就没有第一项了
                // 如果没有第一项的化那我们就把第一项设置为空字符串即可
                const importFrom = splitedLine[1] ? splitedLine[1].trim() : "";
    
                return {
                    importThing,
                    importFrom
                };
            });
    
        res.imports = importsCodeLine;
    
        // 将原始代码字符串中的导入语句全部删除 以免影响后续代码的拆分
        scriptCode = scriptCode.replace(importReg, "").trim();
    
    
        // 第二步 处理 data
        // 先通过正则表达式确定 data 代码在那里
        const dataMatchRes = scriptCode.match(dataReg);
        // 保存 data 对象结束未知的下标
        let dataObjectEndIndex;
    
        // 如果我们在代码中找到了 data
        if (dataMatchRes.index !== -1) {
            const { codeObjectStartIndex, codeObjectEndIndex, splitedItem } = spliteCode(scriptCode, dataMatchRes);
    
            // 先把从开头到 data 内 return 之前的这一段代码截取出来
            // 这部分代码我们不需要动 我们只需要保存即可
            res.otherCodes.push(
                scriptCode.slice(0, codeObjectStartIndex)
            );
    
            // 最后把切取的结果存储在 res 中
            res.datas = splitedItem;
    
            dataObjectEndIndex = codeObjectEndIndex;
        }
    
    
        // 第三步 处理 components
        // 处理过程和处理 data 是一样的
        scriptCode = scriptCode.slice(dataObjectEndIndex);
        const componetsMatchResult = scriptCode.match(componentsReg);
        let componentsObjectEndIndex;
    
        if (componetsMatchResult.index !== -1) {
            const { codeObjectStartIndex, codeObjectEndIndex, splitedItem } = spliteCode(scriptCode, componetsMatchResult);
    
            res.otherCodes.push(
                scriptCode.slice(0, codeObjectStartIndex)
            );
    
            res.components = splitedItem;
    
            componentsObjectEndIndex = codeObjectEndIndex;
        }
    
        // 最后切取出后续剩余的代码 这部分代码我们只需原封不动地保存下来即可
        res.otherCodes.push(
            scriptCode.slice(componentsObjectEndIndex)
        );
    
        // 返回处理结果
        return res;
    }
    // function parse   


    // 匹配 script 标签中的属性的正则
    const scriptTagPropsReg = /<script(?<scriptTagProps>.*?)>/g;
    // 匹配 script 结束标签的正则
    const scriptTagEndReg = /<\/script>/g;

    // 处理结果对象
    const res = {
        tag: "script",
        props: [],
        content: {}
    };

    // 取出 script 标签中的属性
    let props = scriptTagPropsReg.exec(scriptTag).groups.scriptTagProps;
    props = props.trim();
    // 然后将属性拆分为多个独立的字符串
    props = props.split(" ");
    // 而后存放到结果对象中
    res.props = props;

    // 而后从整个样式字符串中删除 style 标签 此时 styleContent 就只是一个包含了代码的字符串了
    const scriptContent = scriptTag
        .replace(scriptTagPropsReg, "")
        .replace(scriptTagEndReg, "");

    // 使用处理函数处理 js 代码
    let parsedContent = parse(scriptContent);

    // 新建 utf8 编码器
    const utf8Encoder = new TextEncoder();

    // 将处理结果进行 utf8 编码
    parsedContent = utf8Encoder.encode(JSON.stringify(parsedContent));

    // 将处理结果进行 base64 编码后保存
    res.content = btoa(parsedContent);

    // 返回对象
    return res;
}


function genScript(scriptObject, mode = "only") {
    // 给定一个由 parseScript 生成的包含样式信息的对象 返回一个此对象对应的 script 字符串
    // scriptObject: Object  由 parseScript 生成的包含样式信息的对象
    // mode: "only" | "full"  生成模式  "only" 表示只生成 script 字符串
    //     "full" 表示生成 script 字符串后还要将生成的 script 包裹在 script 标签中


    function gen(scriptContentJSON) {
        // 给定一个 parseScript 函数返回值中的 content 对象的 json 字符串
        // 方法返回一个该 content 表示的完整代码字符串
    
        // 首先反序列化 而后从对象中取出四个部分
        const { imports, datas, components, otherCodes } = JSON.parse(scriptContentJSON);
    
        // 生成导入代码
        let importsCode = imports
            .map(importObject => {
                if (importObject.importFrom !== "") {
                    return `import ${importObject.importThing} from ${importObject.importFrom}`;
                }
    
                return `import ${importObject.importThing}`;
            })
            .reduce((prev, item) => `${prev}\n${item}`);
        
        importsCode = importsCode + "\n";
    
    
        // 生成 datas 代码
        let datasCode = datas
            .filter(dataItem => dataItem.trim() !== "")
            .reduce((prev, item) => `${prev},\n${item}`);
    
        datasCode = `{\n${datasCode}\n}`;
    
        
        // 生成 components 代码
        let componentsCode = components
            .filter(dataItem => dataItem.trim() !== "")
            .reduce((prev, item) => `${prev},\n${item}`);
    
        componentsCode = `{\n${componentsCode}\n}`;
    
    
        // 把代码拼在一起
        const code = `${importsCode}\n${otherCodes[0]}${datasCode}${otherCodes[1]}${componentsCode}${otherCodes[2]}`;
    
        return code;
    }


    const { tag, props, content } = scriptObject;

    if (tag !== "script") {
        console.log("不是 script 标签! 无法解析");
        return "";
    }

    // 先对内容进行 base64 解码 而后将解码的内容转为 json
    const utf8Code = `[${atob(content)}]`;

    // 新建一个 utf8 解码器
    const utf8Decoder = new TextDecoder("utf8");

    // 解码我们的代码
    const scriptJSONString = utf8Decoder.decode(
        new Uint8Array(JSON.parse(utf8Code))
    );

    // 生成代码
    const code = gen(scriptJSONString);

    if (mode === "only") {
        // 直接返回解析好的内容即可
        return code;
    }
    else if (mode === "full") {
        // 返回一个完整的标签
        return `
<script ${props.join(" ")}>
    ${code}
</script>`;
    }
    else {
        // 用户传递了一个未知的 mode  那就不做任何事
        console.log("未知的解析模式: ", mode);
        return "";
    }
}


function parseStyle(styleTag) {
    // 解析样式代码(scss)的函数
    function parse(styleCode) {
        // 我们发现 css 的结构和 json 是很像的  于是我忽然有了一个想法 就是对 scss 字符串进行简单的处理
        // 将其处理为 json 格式后直接一个反序列化 从而实现对 scss 字符串进行解析  这里做的就是这件事

        // 第一步 现根据 { 和 } 来将 scss 字符串中的每个部分分开
        // 临时数组
        let tmpArr = [];
        // 第一步处理结果数组
        const setpOneResArr = [];
        // 遍历 scss 字符串中的每个字符
        for (let c of styleCode) {
            // 如果当前字符是 { 或 } 的话 那就把临时数组中的每个字符拼接为一个完整的字符串
            // 而后将拼接好的字符串放在第一步结果数组中
            if (c === "}" || c === "{") {
                setpOneResArr.push( tmpArr.join("") );
                // 记得把当前字符也要放到第一步结果数组中哟!
                setpOneResArr.push(c);
                // 清空临时数组
                tmpArr = [];

                continue;
            }

            // 将当前字符放到临时数组中
            tmpArr.push(c);
        }

        // 第二步 将分开的各个 token 变得符合 json 格式的要求
        // 我们需要做如下事情:
        //   将每个 css 属性按照 : 进行切分 而后将切分后的每个小 token 包裹在 "" 中
        //   使用 : 将两个小 token 拼接在一起 得到一个基本的键值对
        //   在每个非 { } 项的后面添加 ,  以符合 json 基本格式
        //   删除所有 } 前的那项末尾的 , 以符合 json 基本格式
        // 清空临时数组
        tmpArr = [];
        // 第二步处理结果数组
        const stepTwoResArr = [];
        // 遍历每一个 token 以去处理每一个 token
        for (let i=0; i<setpOneResArr.length; i++) {
            const token = setpOneResArr[i];

            // 如果当前 token 是 { 的话 那不需要做什么 直接把 { 放在结果数组中即可
            if (token === "{") {
                stepTwoResArr.push(token);
                continue;
            }

            // 如果当前 token 是 } 的话
            // 考虑到 } 后可能还有 scss 内容 因此我们需要为每个 } 添加一个尾随逗号
            if (token === "}") {
                stepTwoResArr.push(`${token},`);
                continue;
            }

            // 此时我们的 token 还是 "attr: val; attr: val; ..." 格式的
            // 我们需要将这包含了很多 css 键值对的字符串拆分为多个只包含单个 css 键值对的字符串
            // 方法就是根据 css 键值对的尾随 ; 来将字符串进行拆分
            const splitedTokens = token
                .split(";")
                .map(t => t.trim())  // 删除拆分开后左右的空格
                .filter(t => t !== '');  // 删除左右空格后有可能当前字符串就已经是一个空字符串了 在这里删除它们

            // splitedTokens 是一个 ["attr: val", "attr: val", ...] 格式的数组
            // 遍历其中的每个元素 以对每个单独的 css 键值对以进行处理
            for (let j=0; j<splitedTokens.length; j++) {
                const splitedToken = splitedTokens[j];

                // 如果当前 token 的右侧是一个 { 的话 那说明当前 token 是一个类似于 ".box" 一样的选择器
                // 我们只需将此 token 包裹在 "" 中 而后再在右侧添加一个 : 即可
                if (j == splitedTokens.length - 1 && setpOneResArr[i+1] === "{") {
                    tmpArr.push(`"${splitedToken}":`);
                    continue;
                }

                // 说明此时 token 是一个类似于 "attr: val" 的字符串
                const fullToken = `${splitedToken};`  // 先在其右侧补一个 ; 此时的结果就是 "attr: val;"
                    .split(":")  // 以 : 作为分界线进行字符串切割 此时得到的是一个 ["attr", "val;"]
                    .map(t => `"${t}"`)  // 将每个元素包裹在 "" 中 此时得到的是 ['"attr"', '"val;"']
                    .join(":");  // 以 : 作为分隔将 将数组中的字符串拼接在一起 得到 '"attr": "val;"'
                
                // 添加 json 键值对结尾所要求的 ,
                // 将结果放在临时数组中
                tmpArr.push(`${fullToken},`);
            }

            // 当前 "attr: val; attr: val; ..." 的大 token 已经处理完了 把处理放在结果数组中
            for (let i of tmpArr) {
                stepTwoResArr.push(i);
            }

            // 清空临时数组 准备处理下一个 token
            tmpArr = [];
        }


        // 处理结尾多余的 ,
        // 在上面 我们在所有的 } 的后面都添加了逗号 而有的逗号是不能存在的
        // 因为 json 要求对象中最后一项的后面不应有 ,
        // 例如 在 {{ ... },}, 中 最后的 } 后的逗号就是不能要的
        // 再例如 在 { attr: val, } 中 最后一个键值对后的 , 也是不能要的
        // 在这里我们需要删除它们
        // 遍历第二部处理结果中的每个结果项
        for (let i=0; i<stepTwoResArr.length - 1; i++) {
            const token = stepTwoResArr[i];
            
            // 如果当前项以 , 结尾 同时当前项的后面那项是一个 }, 的话 说明当前项最后的 , 需要被删除
            // 就这一条足以处理绝大部分不必要的逗号
            if (token.endsWith(",") && stepTwoResArr[i+1] === "},") {
                stepTwoResArr[i] = stepTwoResArr[i].substr(0, stepTwoResArr[i].length - 1);
            }
        }

        // 处理最后的额外情况 就是删除整个 scss 末尾的那个 } 后的 ,
        if (stepTwoResArr[stepTwoResArr.length - 1] === "},") {
            stepTwoResArr[stepTwoResArr.length - 1] = "}";
        }

        // 返回处理结果
        return stepTwoResArr;
    }


    // 准备一个结果对象
    const res = {
        tag: "style",  // style 标签
        props: [],  // 以字符串的形式存储着 style 标签的属性
        content: {}  // 解析后的样式信息对象
    };

    // 匹配 style 标签中的属性的正则
    const styleTagPropsReg = /<style(?<styleTagProps>.*?)>/g;
    // 匹配 style 结束标签的正则
    const styleTagEndReg = /<\/style>/g;

    // 取出 style 标签中的属性
    let props = styleTagPropsReg.exec(styleTag).groups.styleTagProps;
    props = props.trim();
    // 然后将属性拆分为多个独立的字符串
    props = props.split(" ");
    // 而后存放到结果对象中
    res.props = props;

    // 而后从整个样式字符串中删除 style 标签 此时 styleContent 就只是一个包含了样式规则的字符串了
    const styleContent = styleTag
        .replace(styleTagPropsReg, "")
        .replace(styleTagEndReg, "");


    // 解析样式字符串 解析的结果是一个大部分遵循 json 格式的 包含了解析后内容的一个 token 数组
    // 我们只需将得到的 token 数组拼接在一起 而后放在 {} 中 而后我们得到的就是一个完整的字符串了
    const parsedTokens = parse(styleContent);
    const jsonString = `{
        ${parsedTokens.join("")}
    }`;

    try {
        // 尝试解析生成的 json 字符串
        res.content = JSON.parse(jsonString);

        // 返回整个解析结果
        return res;
    } catch(e) {
        console.log("转换时出错: ", e);
    }
}


function genStyle(styleObject, mode = "only") {
    // 给定一个由 parseStyle 生成的包含样式信息的对象 返回一个此对象对应的 scss 字符串
    // styleObject: Object  由 parseStyle 生成的包含样式信息的对象
    // mode: "only" | "full"  生成模式  "only" 表示只生成 scss 字符串
    //     "full" 表示生成 scss 字符串后还要将生成的 scss 包裹在 style 标签中

    function gen(styleContentObject, level = 0) {
        // 根据传递的对象中的样式信息生成 scss 字符串的函数
        // styleContentObject: Obejct  包含样式信息的对象
        // level: Number  当前正在处理第几层样式 我们通过这个参数的信息来生成缩进

        // 存储处理结果的字符串
        let res = ``;

        for (let key in styleContentObject) {
            // 遍历传递进来的样式对象中的每个属性

            // 存储临时处理结果的字符串
            let tmpString = ``;

            if (styleContentObject[key].__proto__ === String.prototype) {
                // 如果当前 key 对应的 val 是一个字符串的话 说明该属性只是一个普通的 css 属性
                // 把它拼接到临时处理结果字符串上即可

                // 计算当前层级下每个属性前的缩进
                let space = ``;
                for (let i=0; i<level; i++) {
                    space = space + `    `;
                }

                // 拼接属性
                tmpString = `${space}${key}: ${styleContentObject[key]}\n`;

                // 最后把结果拼接到处理结果字符串上
                res = `${res}${tmpString}`;

                // 不需要清空 tmpString 因为下一轮循环中 tmpString 就又是一个空字符串了
                // tmpString = ``;
            }
            else if (styleContentObject[key].__proto__ === Object.prototype) {
                // 如果当前 key 对应的 val 是一个对象的话 我们则需要递归处理该对象
                // 而后把递归处理的结果拼接在结果字符串中

                // 计算当前层级下每个属性前的缩进
                let space = ``;
                for (let i=0; i<level; i++) {
                    space = space + `    `;
                }

                // 递归处理
                tmpString = `${space}${key} {\n${gen(styleContentObject[key], level + 1)}${space}}\n`;

                // 将结果拼接在处理结果上
                res = `${res}${tmpString}`;
            }
        }

        // 将处理结果返回
        return res;
    }

    const { tag, props, content } = styleObject;

    if (tag !== "style") {
        console.log("不是 style 标签! 无法解析");
        return "";
    }

    // 将样式内容交由解析函数解析 而后直接返回结果即可
    const styleString =  gen(content);

    if (mode === "only") {
        // 直接返回解析好的内容即可
        return styleString;
    }
    else if (mode === "full") {
        // 返回一个完整的标签
        return `
<style ${props.join(" ")}>
    ${styleString}
</style>`;
    }
    else {
        // 用户传递了一个未知的 mode  那就不做任何事
        console.log("未知的解析模式: ", mode);
        return "";
    }
}



function parseCode(code) {
    // 解析整个 vue 原文件的代码
    // code: String  需要被解析的 vue 文件源码

    const templateCode = getTemplateCode(code);
    const scriptCode = getScriptCode(code);
    const styleCode = getStyleCode(code);

    const parsedTemplate = parseTemplate(templateCode);
    const parsedScript = parseScript(scriptCode);
    const parsedStyle = parseStyle(styleCode);

    return {
        template: parsedTemplate,
        script: parsedScript,
        style: parsedStyle
    };
}


function genCode(parsedCodeObject) {
    // 生成整个 vue 源文件代码
    // parsedCodeObject: Object  是 parseCode 函数返回的对象

    const { template, script, style } = parsedCodeObject;

    const templateCode = genTemplate(template);
    const scriptCode = genScript(script, mode="full");
    const styleCode = genStyle(style, mode="full");

    return `${templateCode}\n\n${scriptCode}\n\n${styleCode}\n`;
}



module.exports = {
    getTemplateCode,
    getScriptCode,
    getScriptCode,

    parseTemplate,
    parseScript,
    parseStyle,

    genTemplate,
    genScript,
    genStyle,

    parseCode,
    genCode
};
