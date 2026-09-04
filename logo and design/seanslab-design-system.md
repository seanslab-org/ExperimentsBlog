# seanslab · 设计规范

*最后更新：2026-04-18 v1.1 · 品牌 accent 从紫色换为琥珀橙（取自 logo spec）*
*维护人：Sean · 实现参考：`/ExperimentsBlog/make_xhs_card.py`*

---

## 0. 为什么有这份规范

seanslab 的内容是**硬核技术写作**——带宽、LLM 推理、DSP 底层。这意味着：

- 视觉不能抢文字的风头（文字本身很贵重）
- 视觉必须和文字的气质对齐（solid、直接、少装饰）
- 每一次设计都应当是**编辑级**的，不是 social media 模板级的

这份规范**不是**一套任意的美学偏好，而是**一组经过 Sean 实际审核验证的强约束**，用来保证：

1. 未来任何一张 seanslab 的视觉物料（封面、海报、系列图）都**认得出**是 seanslab
2. 从 PIL 到 Figma 到 Canva 到 Manus——**换工具不换规范**
3. 内容更新时只改文字，**版式稳定**

---

## 1. 气质北极星（Taste Anchor）

**参考**：[tuwa.ai](https://tuwa.ai) 的网站视觉语言。

提取出来的关键气质词（按权重排序）：

| 排序 | 关键词 | 翻译成设计动作 |
|---|---|---|
| 1 | **Editorial** | 大量留白、严格基线对齐、排版像杂志封面而非宣传海报 |
| 2 | **Minimal** | 每张封面只放 1 个主句 + 1 个 punch + 1 个署名。不加 ghost 字、不加装饰、不加 callout 卡片 |
| 3 | **Warm** | 底色是米白（奶白）而非纯白或灰色；文字是深炭而非纯黑 |
| 4 | **Grid-strict** | 横线 / 竖线只在需要分区时出现，一出现就是精准的发丝线 |
| 5 | **Solid** | 主标题用最重的无衬线（Black），不用渐变、不用阴影、不用装饰字体 |

**反例**（**不要出现**）：

- 渐变底 / 彩色背景 / 噪点底纹
- emoji / 贴图 / 卡通元素
- 双色字（外描边、阴影叠加）
- 倾斜排版 / 曲线排版
- 圆角卡片 + 数据 box 堆叠
- 多种字体混用（超过 3 个 family）

---

## 2. 色彩系统

### 2.1 色值表

| 角色 | 变量名 | Hex | RGB | 用处 |
|---|---|---|---|---|
| 背景 | `BG` | `#EDE8DE` | `237, 232, 222` | 整张海报底色。**永远不用纯白** |
| 主文字 | `INK` | `#0F0F0F` | `15, 15, 15` | 标题、数据值、主阅读文本。**永远不用纯黑** |
| 辅文字 | `DIM` | `#6A6458` | `106, 100, 88` | 版权、series 标签、辅助说明 |
| 线条 | `LINE` | `#CFC8B8` | `207, 200, 184` | 分割线、框线。**永远是发丝 1px** |
| **品牌琥珀橙** | `AMBER` | `#F28A1A` | `242, 138, 26` | **唯一强调色**，必须克制使用。来自 [seanslab-color-spec.md](./seanslab-color-spec.md) logo 主色 |

### 2.2 Amber 的使用纪律

Amber 是整套系统里**唯一的高饱和元素**，出现即抢焦点。规则：

**一张图里 amber 最多出现 4 次**，且必须落在这几个点上：

1. 顶栏品牌名后面的**圆点**（12px 直径）
2. 主标题之下的**punch line**（短句，15 字以内）
3. 底栏左侧页码前的**圆点**（12px 直径，和顶栏那个**完全一致**）
4. 底栏右侧 QR 旁的**公众号名** "咋不早说"

**违反**：在 data callout / 数据数字 / 大段文字上使用 amber。`0.33%` 可以用 amber，但一张卡片里不能**同时**有 amber `0.33%` 和 amber punch line——会打架。

### 2.3 不许出现的颜色

- 纯白 `#FFFFFF`（底色用 `#EDE8DE`）
- 纯黑 `#000000`（文字用 `#0F0F0F`）
- 任何红、绿、蓝、紫、粉——除非是引用第三方内容需要保真色
- 渐变（即使是同色系的 2 色渐变也不用）

### 2.4 关于 logo-spec 里的其他颜色

`seanslab-color-spec.md` 里还定义了 gold `#C9A227`、wood `#1B4332`、wood-green `#4A9A6E`、ink-night `#0A0A0F`——**那些是给网站 / 代码块 / 终端主题用的**，**不在小红书封面设计里出现**。封面只用 amber 这一个主色作为唯一 accent，保证视觉纯净。

### 2.5 Logo · Elephantulus（小象星座）

seanslab 的品牌 mark 是一只卡通小象，正式名 **Elephantulus**（拉丁语 "小象"），官方身份是一个"非正式星座"（unofficial asterism），由 8 颗"星"构成：body / head / eye / 3 × trunk bubbles / 2 legs。配套 LORE：

> *a calf turns to look back.*
> *the glance is held still.*
> *the trunk, curled, salutes the mother constellation*
> *from which it came.*

**气质定位**：友好 / 角色化 / 有人格感——和硬核技术写作形成**中和的反差**，让 seanslab 不是冷冰冰的实验室，而是有温度的 lab。

**资源文件**：见 §8.2

**颜色**：logo 所有变体用 SVG `currentColor`，可以任意着色。主场景用 **amber `#F28A1A`**（与品牌 accent 一致）。已预生成 `seanslab-mark-amber-512.png`（amber 着色 + 白底透明）供 raster 使用。

---

## 3. 字体系统

### 3.1 字体栈

| 角色 | 字体 | 文件路径（Linux 沙盒） |
|---|---|---|
| **CJK 中文** | Droid Sans Fallback | `/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf` |
| Latin 粗体显示 | **Lato Black** | `/usr/share/fonts/truetype/lato/Lato-Black.ttf` |
| Latin Bold | Lato Bold | `/usr/share/fonts/truetype/lato/Lato-Bold.ttf` |
| Latin Regular | Lato Regular | `/usr/share/fonts/truetype/lato/Lato-Regular.ttf` |
| **小字大写标签** | Liberation Mono / Bold | `/usr/share/fonts/truetype/liberation/LiberationMono-{Regular,Bold}.ttf` |
| Serif 斜体点缀 | Caladea Bold Italic | `/usr/share/fonts/truetype/crosextra/Caladea-BoldItalic.ttf` |

### 3.2 尺寸阶梯（1080×1440 画布）

| 用途 | CJK 字号 | Latin 字号 | 说明 |
|---|---|---|---|
| 主标题 | **130 pt** | **145 pt** Lato Black | Latin 需要比 CJK 大 10–15 pt 才能光学等重 |
| Punch line | 68 pt | 74 pt | 主标题之下那句，**amber** |
| 品牌字 | — | 32 pt Lato Black | `seanslab.org` |
| Section 标签 | — | 22 pt Mono | `SERIES_VOL.01`, `© 2026` |
| 页码 / 框架数字 | — | 24 pt Mono Bold | `01 / 06` |
| 底栏说明 | 24 pt | 22 pt Mono | `带宽系列 · BANDWIDTH` |
| QR 主名 | 30 pt | — | **咋不早说**，**amber** bold |
| QR 副标 | 24 pt | — | `微信公众号` / `扫码关注` |

### 3.3 混排规则（中英混排）

**CJK 字符**走 Droid Sans Fallback；**Latin 字符**走对应 Lato weight。**不能**用一个字体渲染两种，否则要么中文缺笔画要么英文出方块（Droid Sans Fallback 对 Latin 支持极差）。

实现参考 `make_xhs_card.py` 中的 `draw_mixed()` 和 `segments()` 函数——按 Unicode codepoint 自动切分后分别渲染。

### 3.4 Fake-bold 规则

Droid Sans Fallback 只有 Regular 一个字重。需要 bold 效果时，**不要**用 PIL 的 `stroke_width`（会糊），用**多通道偏移叠加**：

```python
for dx in range(2):
    for dy in range(2):
        draw.text((x + dx, y + dy), text, font=font, fill=color)
```

效果接近 SemiBold。Lato Black 自带 black weight，直接用即可。

---

## 4. 版面栅格（Canvas Grid）

### 4.1 画布尺寸

| 媒介 | 尺寸 | 比例 |
|---|---|---|
| **小红书封面**（主） | **1080 × 1440** | 3:4 |
| 朋友圈 / 公众号 banner | 900 × 383 | 未来补 |
| Twitter header | 1500 × 500 | 未来补 |

### 4.2 边距与分区

所有尺寸以 1080×1440 为基准：

```
+---------------------------------------------------+  0
|                                                   |
|   TOP BAR (200 px)                                |
|   baseline y=120   [seanslab.org ●]    [© 2026]   |
|                                                   |
+---------------------------------------------------+  200  ← thin divider
|                                                   |
|                                                   |
|   HEADLINE REGION (1010 px)                       |
|   vertically centered                             |
|   line 1 baseline y=545                           |
|   line 2 baseline y=705                           |
|   punch  baseline y=875                           |
|                                                   |
|                                                   |
+---------------------------------------------------+  1210 ← thin divider
|                                                   |
|   BOTTOM BAR (230 px)                             |
|   left:  [● 01/06]          right:  [QR 160×160]  |
|          [带宽系列 · ...]           [微信公众号]   |
|                                     [咋不早说]    |
|                                     [扫码关注]    |
+---------------------------------------------------+  1440
```

### 4.3 边距常量

- **左右边距 `MX` = 100 px**（所有内容都从 x=100 起、到 x=980 止）
- **顶栏高度 = 200 px**
- **底栏高度 = 230 px**（比顶栏略高以容纳 QR）
- **QR 尺寸 = 160 × 160 px**，右对齐到 `W - MX`

### 4.4 基线对齐规则（核心）

**左右对应元素必须共享基线**。这是杂志级对齐的标志。

具体：
- 顶栏：`seanslab.org`（Lato 32pt）与 `© 2026`（Mono 22pt）→ **同一基线 y=120**
- 底栏：
  - 左 `● 01 / 06` baseline **=** 右 `咋不早说` baseline（amber 元素视觉镜像）
  - 左 `带宽系列 · BANDWIDTH` baseline **=** 右 `扫码关注` baseline（辅助文字视觉镜像）

实现：PIL `draw.text(..., anchor="ls")` —— 强制按基线锚定，无视字体 ascent 差异。

### 4.5 分割线规则

- **颜色**：`LINE = #CFC8B8`
- **粗细**：**永远是 1 px**
- **长度**：从 x=`MX` 到 x=`W - MX`（两边都不顶到画布边）
- **出现位置**：仅 2 条——顶栏下方（y=200）和底栏上方（y=1210）
- **永远不画十字**。真要用竖向 axis，单独画，且穿过整个内容区（不要和横线交叉形成"十字"）

### 4.6 Amber 圆点规范

- **颜色**：`AMBER = #F28A1A`
- **直径 12 px**（半径 6 px），实心
- **垂直位置**：对齐到相邻文字的 x-height 中心，不是 baseline，不是 ascender
- 计算公式：`dot_cy = baseline_y - font_size * 0.35`
- 顶栏和底栏的两个琥珀点**必须同尺寸同位置关系**——不能一个大一个小

---

## 5. 组件库

### 5.1 顶栏（Header）

```
[seanslab.org]  [🐘 logo 56px]                      [© 2026]
──────────────────────────────────────────────────────────── (分割线)
```

- 左：`seanslab.org` Lato Black 32pt + **Elephantulus logo 56px**（amber 着色）
- 右：`© 2026` Mono Regular 22pt
- 两者基线 y=120
- 分割线在 y=200

**Logo 位置规则**：
- 水平：品牌名右侧 18px gap
- 垂直：logo 的光学中心对齐到 "seanslab.org" 的 **x-height 中心**（≈ baseline - cap_height × 0.7）
- 尺寸：**56px 方形**（约等于品牌字 cap height × 2）
- 颜色：amber，使用预生成的 `seanslab-mark-amber-512.png`（alpha 通道已处理）

**不允许的变体**：
- 不要把品牌名换成 `seanslab`（已废弃）或 `@OldSong`
- 不要加 slogan / tagline
- 不要在这一栏放章节标题（那是主内容区的事）
- 不要把 logo 放在其他地方（页眉 / 页脚 / 水印等）—— logo 只在顶栏出现一次

### 5.2 主标题 + Punch

```
你的 MacBook                    ← 主标题第 1 行 (CJK 130 / Latin 145, INK)
跑不动 70B。                    ← 主标题第 2 行
                                 ← 空一个行高
不是算力，是带宽。              ← Punch (CJK 68 / Latin 74, AMBER)
```

- 主标题 **最多 2 行**。每行 6-10 个可见字符（中 + 英）
- Punch line **1 句，≤15 字**，以句号收尾，颜色 `AMBER`
- 整个块**垂直居中**于顶底分割线之间
- **所有行都左对齐**到 x=`MX`。不居中、不右对齐

### 5.3 底栏（Footer）

```
                                        [微信公众号]
                                        [咋不早说 AMBER] [ QR ]
● 01 / 06                               [扫码关注]      [160 ]
带宽系列 · BANDWIDTH                                    [px  ]
```

**右侧 QR 栈**（3 行，垂直居中于 QR 高度）：
- 第 1 行：`微信公众号` (CJK 24pt, DIM, 右对齐)
- 第 2 行：`咋不早说` (CJK 30pt, **AMBER + fake bold**, 右对齐) ← 光学居中对齐 QR 中心
- 第 3 行：`扫码关注` (CJK 24pt, INK, 右对齐)
- 行间距 40 px

**左侧文字栈**（2 行，基线对齐右栈第 2、3 行）：
- 第 1 行：`● 01 / 06` —— amber 点 + Mono Bold 24pt
- 第 2 行：`带宽系列 · BANDWIDTH` —— 混排 CJK 24pt + Mono 22pt, DIM

**QR 处理**：
- 文件保存为 `ExperimentsBlog/qr-zhabuzaoshuo.png`
- 白底必须**转成米白 `#EDE8DE`**（script 自动做）以融入海报背景
- 深色像素保持 `#0F0F0F` 以保证扫描性
- 中间 logo（"咋"字）保留

### 5.4 署名规则

**唯一署名 = 微信公众号 "咋不早说" 的 QR 码**。

不允许：
- `@OldSong` 文字 handle
- `seanslab.org · @OldSong` 组合
- 小红书 handle
- GitHub handle
- 邮箱

理由：QR 码一次到位引流公众号（Sean 的主阵地），文字 handle 分散注意力且手机上不可点击。

---

## 6. 内容编辑规范（文案层）

### 6.1 主标题（Hook）公式

**反转 + 具体化**。不讲大道理，给一个具体场景 + 一个反直觉结论。

示例（全部来自带宽系列）：

| ✓ Good | ✗ Bad |
|---|---|
| 你的 MacBook 跑不动 70B。 | 大语言模型性能瓶颈深度解析 |
| H100 算了 99.67% 的空气 | H100 GPU 利用率分析 |
| 苹果统一内存 = 超宽 LPDDR5X | Apple Silicon 内存架构详解 |
| MoE 是给云设计的 | 混合专家模型架构综述 |

规则：
- 主语必须是**具体的产品/设备/人**（MacBook、H100、苹果）
- 谓语必须是**有冲突的动作**（跑不动、算空气、= 超宽 XX、是给云设计的）
- 不用"深度解析/全面分析/综述"这种 SEO 词
- 不加问号。用陈述句的冲击力

### 6.2 Punch line 公式

**主标题的"所以呢"**。一句话点出 insight，颜色 `AMBER`。

公式：`不是 A，是 B。`

```
不是算力，是带宽。
不是硬件问题，是物理问题。
不是软件优化，是架构选择。
```

固定以句号"。"结尾（CJK 全角）。

### 6.3 Series 编号规则

每张卡带两个身份标识：

- **顶栏右**：`© 2026`（年份，其他内容不加）
- **底栏左**：`● 01 / 06`（系列内编号） + `带宽系列 · BANDWIDTH`（系列名称）

其中 `01 / 06` 是该系列内第几张 / 共几张。例如带宽系列有 6 张封面图，则依次是 `01/06` ... `06/06`。

---

## 7. 执行检查清单（Pre-ship Checklist）

每张卡出稿前按这个单子过一遍：

- [ ] 底色是 `#EDE8DE`，**不是**纯白
- [ ] 主文字是 `#0F0F0F`，**不是**纯黑
- [ ] AMBER `#F28A1A` 出现 ≤ 4 次，且都在允许位置
- [ ] 顶栏 amber 点和底栏 amber 点直径一致（12px）
- [ ] 顶栏两侧基线对齐（y=120）
- [ ] 底栏左右栈基线对齐（左栈 2 行 ↔ 右栈 2 & 3 行）
- [ ] 主标题 ≤ 2 行、左对齐、x=`MX`
- [ ] Punch line ≤ 15 字、amber 色、句号结尾
- [ ] 分割线 1px、`#CFC8B8`、x 范围 `MX` 到 `W-MX`
- [ ] **没有** ghost 背景字、数据 callout 卡片、`@OldSong` 文字署名
- [ ] QR 白底已换成米白、中间 logo 保留、放在底栏右侧
- [ ] 所有中英文字符都用了对应字体（没有方块 □）
- [ ] 边距 x=100 严格遵守
- [ ] 卡片不包含任何 emoji / 渐变 / 阴影 / 装饰图形
- [ ] 没有紫色、蓝色、绿色、粉色等其他强调色出现

---

## 8. 实现参考

### 8.1 参考脚本

```
/ExperimentsBlog/make_xhs_card.py
```

这是带宽系列 01 的完整实现。批量生产时：**复制脚本、只改内容字符串**。不改版式常量。

v1.1 色值切换：脚本里 `PURPLE` 常量替换为 `AMBER = (232, 112, 10)`；其他色值不动。

### 8.2 资源文件

```
/ExperimentsBlog/
├── qr-zhabuzaoshuo.png                ← 处理过的 QR（米白底）
├── IMG_0349.JPG                       ← QR 原图（带白底，勿删）
├── make_xhs_card.py                   ← 参考实现
├── #005-bandwidth-小红书-01.jpeg      ← 成品（待按 v1.1 重生成）
└── logo and design/
    ├── seanslab-design-system.md      ← 本文件
    └── seanslab-color-spec.md         ← 色彩原始规格（logo 出处）
```

### 8.3 换工具的迁移路径

如果要迁到 Figma / Canva / Manus：

1. **颜色**：直接套第 2 节的 hex 表
2. **字体**：用目标工具里等价字体——Lato Black → Inter Black / Helvetica Black；Droid Sans Fallback → **PingFang SC**（macOS）/ **Source Han Sans**（Adobe）/ **Noto Sans CJK**（Google）；Mono → JetBrains Mono / IBM Plex Mono
3. **栅格**：按第 4 节的坐标直接复刻，在 Figma 里做成 Auto Layout Frame
4. **签名 QR**：用同一张 `qr-zhabuzaoshuo.png`

**保持不变的三件事**：颜色规则、amber 纪律（≤ 4 次）、基线对齐原则。其他都可本地化。

---

## 9. 未决问题（未来迭代）

- [ ] 公众号 banner / 头图规范（900×383）
- [ ] Twitter / X header 规范（1500×500）
- [ ] 文章内配图（图表、示意图）的风格规范
- [ ] 视频封面规范（如果开启 B 站 / YouTube）
- [ ] 英文版是否需要另一套字体（英文为主时可考虑 Playfair Display 做 serif hero）

---

## 10. 版本历史

| 日期 | 版本 | 变更 |
|---|---|---|
| 2026-04-18 | v1.0 | 首版。来自带宽系列小红书封面 5 轮迭代。Cream 底 + purple accent。 |
| 2026-04-18 | v1.1 | 品牌 accent 从 purple `#5B3FA8` 切换为 amber `#E8700A`（来自 logo-spec）。其余 tuwa.ai 风格（米白底、near-black 文字、版式、栅格、字体、基线规则、QR 处理）全部保留。 |
| 2026-04-18 | v1.2 | Logo 色号更新：`#E8700A` → `#F28A1A`（略亮、略偏黄，更贴合品牌 logo 最终稿）。全文档、脚本、资源文件同步替换。 |

---

*这份规范不是死的。当你发现某条规则在某个场景下违反直觉，先打破、再来改这里。规范服务于内容，不是反过来。*
