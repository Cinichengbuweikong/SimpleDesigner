import expand from "emmet";

import newNormalComponents from "./cmds/newNormalComponents.js";
import newPageComponents from "./cmds/newPageComponents.js";

import deleteNormalComponents from "./cmds/deleteNormalComponents.js";
import deletePageComponents from "./cmds/deletePageComponents.js";

import setComponentMetaData from "./cmds/setComponentMetaData.js";


/** 存储通用命令的对象 使用键树来存储命令 */
const commonCmds = {
    cmd: "[emmet]",
    desc: "Emmet 语句",
    placeholder: "",
    syntax: "[emmet]",
    action: () => {},

    childs: {
        "?": {
            cmd: "?",
            desc: "显示命令帮助信息",
            placeholder: "显示帮助信息",
            syntax: "?",
            action: () => {},
            childs: {}
        },
    
        "&": {  // key 就是命令
            // 命令
            cmd: "&",
    
            // desc 是命令的介绍
            desc: "设置现在使用某个组件",
    
            // 需要显示在命令输入框中的内容  #SIMPLE_DESIGNER_REPLACER# 届时会被替换为用户输入的内容
            placeholder: "设置 id 为 #SIMPLE_DESIGNER_REPLACER# 的组件为当前组件",
    
            // 命令的语法
            syntax: "&<compID>",
    
            // 执行该命令时所需执行的函数
            action: () => {},

            // 以该字符开头的其他命令
            childs: {}
        },
    
        "!": {
            cmd: "!",
            desc: "新建普通组件",
            placeholder: "新建普通组件 #SIMPLE_DESIGNER_REPLACER#.vue",
            syntax: "!<compName>",
            action: newNormalComponents,
    
            childs: {
                "!": {
                    cmd: "!!",
                    desc: "新建页面组件",
                    placeholder: "新建页面组件 #SIMPLE_DESIGNER_REPLACER#.vue",
                    syntax: "!!<compName>",
                    action: newPageComponents,
                },
            }
        },
    
        "#": {
            cmd: "#",
            desc: "删除普通组件",
            placeholder: "删除普通组件 #SIMPLE_DESIGNER_REPLACER#.vue",
            syntax: "#<compName>",
            action: deleteNormalComponents,
    
            childs: {
                "#": {
                    cmd: "##",
                    desc: "删除页面组件",
                    placeholder: "删除页面组件 #SIMPLE_DESIGNER_REPLACER#.vue",
                    syntax: "##<compName>",
                    action: deletePageComponents,
            
                },
            }
        },
    
        "@": {
            cmd: "@",
            desc: "在当前组件的内部添加一个组件",
            placeholder: "将 #SIMPLE_DESIGNER_REPLACER#.vue 添加到当前组件内部",
            syntax: "@<compName>",
            action: () => {},
            childs: {}
        },
    
        "~": {
            cmd: "~",
            desc: "删除当前组件内部的指定 id 的组件",
            placeholder: "从当前组件中移除 id 为 #SIMPLE_DESIGNER_REPLACER# 的组件",
            syntax: "~<compID>",
            action: () => {},
    
            childs: {
                "~": {
                    cmd: "~~",
                    desc: "删除当前组件内部所有指定名字的组件",
                    placeholder: "将当前组件中所有名字为 #SIMPLE_DESIGNER_REPLACER#.vue 的组件移除掉",
                    syntax: "~~<compName>",
                    action: () => {},
                },
            }
        },
    
        ">": {
            cmd: ">",
            desc: "设置组件元信息",
            placeholder: "",
            syntax: "><key> <value>",
            action: setComponentMetaData,
            childs: {}
        },
    },
};


/**
 * 解析 emmet 命令为结果字符串
 * @param {string} emmetCmd 
 * @returns { {success: boolean, res: string} }
 */
export function expandEmmet(emmetCmd) {
    /** emmet 解析结果  @type {string} */
    let expandedRes = "";

    /** 是否解析成功  @type {boolean} */
    let isSuccessd = true;

    try {
        expandedRes = expand(emmetCmd, {
            type: "stylesheet"
        });
    } catch {
        expandedRes = `不合法的 emmet 语句: ${emmetCmd}`
    }

    return {
        success: isSuccessd,
        res: expandedRes
    };
}


/**
 * @typedef CommonCmdObject
 * @property {string} cmd
 * @property {string} desc
 * @property {string} placeholder
 * @property {Function} action 
 */


/**
 * 给定一个页面的名称和用户所输入的内容
 * 方法将检索此页面内可以使用的命令 而后返回这些命令的信息以供页面展示候选项
 * @param {string} cmd
 * @returns {Array<{CommonCmdObject}>}
 */
export function searchCmds(cmd) {
    /** 结果数组 用于存储处理后的需要被返回的结果 */
    const res = [];

    /**
     * 生成匹配当前输入的命令信息 并把信息放在 res 数组中
     * @param {Object} currentNode 键树中的某个节点
     */
    function genRes(currentNode) {
        let {cmd, desc, placeholder, syntax, action} = currentNode;
        
        res.push({
            cmd,
            desc: `语法: ${syntax}  ${desc}`,
            placeholder,
            action,
        });

        if (currentNode.childs) {
            const childsKeys = Object.keys(currentNode.childs);

            for (let key of childsKeys) {
                genRes(currentNode.childs[key]);
            }
        }
    }

    if (cmd === "?") {
        // 此时我们需要显示所有命令
        genRes(commonCmds);

        // 输入 ? 时显示的是根节点的 placeholder 然而根节点的 placeholder 是 emmet 的 placeholder
        // 因此在此修正这个问题
        res[0].placeholder = commonCmds.childs["?"].placeholder
    } else {
        // 找到用户输入的命令在键树中对应的节点 
        let currentNode = commonCmds;

        for (let c of cmd) {
            // 如果存在子节点 同时子节点中有字符 c 对应的节点的话
            if (currentNode.childs && currentNode.childs[c]) {
                currentNode = currentNode.childs[c];
            } else {
                // 防止出现 c#000 这种 emmet 语句匹配 "删除普通组件 #000.vue 这种情况"
                break;
            }
        }

        if (currentNode.cmd === commonCmds.cmd) {
            // 说明是一个 emmet 语句
            // 此时就只显示 emmet 的提示即可

            let {cmd: originalCmd, desc, placeholder, syntax, action} = currentNode;

            // 生成 emmet 的 placeholder
            placeholder = expandEmmet(cmd).res;
        
            res.push({
                cmd: originalCmd,
                desc: `语法: ${syntax}  ${desc}`,
                placeholder,
                action,
            });
        } else {
            genRes(currentNode);
        }
    }

    return res;
}


/**
 * 根据用户输入的内容和用户输入所匹配的命令 解析出命令的参数
 * @param {String} originalCmd  本应用定义的命令 例如 !
 * @param {String} cmd  用户的输入 例如 !Temp
 */
function getParam(originalCmd, cmd) {
    if (originalCmd === ">") {
        // 需要对其进行特殊处理
        return cmd.substr(originalCmd.length).split(" ").map(s => s.trim());
    }

    return cmd.substr(originalCmd.length);
}


/**
 * 根据用户输入的命令和命令对象 生成该命令对应的完整的可以显示在命令输入框中的等价信息
 * emmet 的 placeholder 将在 searchCmd 中生成
 * @param {Array<{
 *  cmd: string,
 *  desc: string,
 *  placeholder: string
 * }>} cmdObject 
 * @param {string} cmd 
 */
export function genPlaceholder(cmdObject, cmd) {
    let placeholderText = "";

    // 生成需要显示在命令输入框中的等价信息
    if (cmd.length !== 0) {
        
        // 只有当用户输入了命令后才显示等价信息
        const { cmd: originalCmd, placeholder } = cmdObject;

        // 首先通过 originalCmd 和 cmd 将用户输入的命令的参数取出来
        let param = getParam(originalCmd, cmd);

        if (cmd === ">") {
            placeholderText = "s: 缩放, w: 组件宽度, r: 组件横纵比";
        }
        else if (cmd.startsWith(">s")) {
            placeholderText = "s <number>  设置组件缩放";
        }
        else if (cmd.startsWith(">w")) {
            placeholderText = "w <number>  设置组件宽度(px)";
        }
        else if (cmd.startsWith(">r")) {
            placeholderText = "r <w>/<h>  设置组件横纵比 例如 3/2"
        }
        else {
            placeholderText = placeholder.replace("#SIMPLE_DESIGNER_REPLACER#", param);
        }
    } else {
        // 否则显示默认信息
        placeholderText = "输入 ? 显示命令介绍信息";
    }

    return placeholderText;
}


/**
 * 运行用户输入的命令
 * @param {Object} componetObject  组件实例对象 也就是组件的 this
 * @param {Object} cmdObject  用户输入的内容所匹配的命令对象
 * @param {string} cmd  用户输入的内容 
 * @param {string} componentID  被操作的组件的 id
 * @returns {string | null}
 */
export function runCmd(componetObject, cmdObject, cmd, componentID) {
    // 从命令对象中取出要执行的命令和原始命令
    const { cmd: originalCmd, action } = cmdObject;
    // 根据用户输入和原始命令来取出参数
    let param = getParam(originalCmd, cmd);

    // 使用参数执行命令 并返回执行结果
    return action(componetObject, param, componentID);
}