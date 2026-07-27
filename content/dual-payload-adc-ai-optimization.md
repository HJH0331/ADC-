# 针对双 payload ADC 共性缺陷的 AI 研究方向

生成日期：2026-07-27

## 口径说明

本文只基于已调研的 14 篇 CNS / Nature Portfolio 体系论文，不引入非 CNS 文献作为参考依据。这里的“CNS”按既有清单口径执行，包括 Nature Portfolio、npj、Scientific Reports 和 Nature Reviews Drug Discovery / Clinical Oncology / Nature Chemistry 等。

需要先明确一个前提：这 14 篇论文中，真正直接构建治疗性 dual-payload ADC 并做体内药效验证的原始研究主要是 2021 年 Nature Communications 的 HER2-MMAE/MMAF dual-drug ADC。其余论文多数是综述、方法学、工程平台或产业新闻，不能直接当成疗效证据。

因此，本研究方向文件不把“dual-payload ADC 已经被临床证明成功”作为前提。更准确的判断是：

**双 payload ADC 已经形成明确技术趋势，但其设计科学还不成熟。当前真正缺的不是“能否把两个 payload 接上抗体”，而是如何理性决定 payload 组合、payload ratio、linker 释放顺序、适应症选择和毒性安全窗。**

---

## 一、共性缺陷总结

### 缺陷一：payload 组合仍偏经验驱动

现有论文反复强调 dual-payload ADC 可以克服耐药和肿瘤异质性，但对于“哪两个 payload 最应该组合”没有给出系统方法。2021 年 Nature Communications 的 HER2 MMAE/MMAF dual-drug ADC 证明了双 payload 在临床前模型中有价值，但 MMAE/MMAF 都属于微管抑制剂，机制差异有限。多个综述也只是提出 payload diversification 的方向，没有形成可计算的 payload pair 选择标准。

### 缺陷二：payload ratio、DAR 和位点分布缺少预测模型

Scientific Reports 2017 论文解决了 DAR 快速分析问题，Nature Chemistry 2024 综述系统讨论了 homogeneous multi-payload ADC 的偶联策略。但这些工作主要说明“怎么测”和“有哪些化学路线”，还没有回答“两个 payload 的比例应该是多少”“不同 DAR 组合如何影响疗效、PK、聚集和毒性”。

### 缺陷三：linker 释放顺序缺少可泛化规律

双 payload ADC 的优势很大程度上取决于两个 payload 在血浆、溶酶体和肿瘤微环境中的释放行为。但现有 CNS 论文更多是综述 linker 类型或建立 payload 定量方法，没有形成从 linker 结构、payload 性质和微环境条件预测释放顺序的模型。

### 缺陷四：肿瘤异质性只是被描述，没有被系统建模

dual-payload ADC 的核心叙事之一是克服肿瘤异质性。2021 年 Nature Communications 论文用 HER2 异质性模型验证了这一点，肺癌、乳腺癌和前列腺癌综述也都提到异质性问题。但现有工作很少把靶点表达、内吞能力、旁观者效应、耐药克隆比例和 payload 敏感性整合为一个可计算评分。

### 缺陷五：双 payload 毒性叠加和治疗窗预测不足

两个 payload 可能增强疗效，也可能叠加毒性。Nature Chemistry 2024 和多个 npj 综述都提到 multi-payload ADC 的技术挑战，但尚未形成系统的 toxicity window 预测框架。尤其是 DNA damage、骨髓抑制、肝毒性、肺毒性、免疫激活等风险，很难只靠单一体外药敏判断。

### 缺陷六：临床转化证据仍弱

Nature Reviews Drug Discovery 2025/2026 的新闻说明 dual-payload ADC 已进入早期临床和产业布局，但新闻不能代替 ORR、PFS、OS、DLT、RP2D、PK/PD 或 CMC 证据。当前仍缺少一个模型来判断：哪些 dual-payload ADC 临床前设计更可能在人体中失败，失败原因会来自疗效不足、毒性、患者分层还是制造复杂度。

---

## 方向一：payload pair 智能推荐模型

**论文A·干实验：基于药敏组学与耐药通路知识图谱的 dual-payload ADC payload pair 推荐**

### 一、前景

现有 ADC 载荷高度集中在微管抑制剂和 TOP1 抑制剂。dual-payload ADC 的出现，本质上是希望通过两个 payload 机制互补，覆盖单一 payload 打不到的肿瘤细胞群。问题在于，现有论文并没有真正回答“哪两个 payload 应该配在一起”。

2021 年 Nature Communications 的 HER2 MMAE/MMAF dual-drug ADC 是这个领域最重要的临床前证据之一。它证明了同一抗体同步递送两个 payload 可以优于两个单 payload ADC 共给药。但这篇论文也留下了一个更大的问题：MMAE/MMAF 组合为什么是合理组合？如果换成 TOP1 抑制剂、DNA damage payload、免疫刺激 payload 或蛋白降解 payload，应该如何选择？

这不是一个普通的药物组合筛选问题。ADC payload 的选择还必须同时满足几个约束：payload 要足够强，释放后要能到达作用位点，不能被外排泵快速排出，毒性不能完全重叠，且最好能针对不同耐药机制形成互补。

因此，这一方向的核心问题是：

**能否建立一个面向 dual-payload ADC 的 payload pair 智能推荐模型，在合成 ADC 之前先预测哪些 payload 组合最值得做？**

### 二、相关工作

Nature Communications 2021 证明了 HER2 MMAE/MMAF dual-drug ADC 在乳腺癌异质性和耐药模型中的临床前价值。

Nature Reviews Clinical Oncology 2024 将 dual-drug ADC 列为下一代 ADC 格式之一，认为其可用于处理耐药和异质性。

npj Breast Cancer 2025 和 npj Precision Oncology 2025 的多篇综述都提到 multi-payload / dual-payload ADC 可作为克服耐药的策略。

但这些论文的共同限制是：它们提出了 payload diversification 的必要性，却没有给出 payload pair 的定量选择规则。

### 三、不足与我们的做法

**不足一：payload 组合缺少系统筛选。**  
现有设计大多从已知 payload 出发，基于药理常识或可合成性组合，而不是从耐药网络、药敏谱和毒性谱出发反向推荐。

**不足二：协同与毒性常被分开考虑。**  
一个 payload pair 即使协同杀伤强，也可能因骨髓毒性、肝毒性或正常组织敏感性重叠而不可用。

**不足三：ADC 场景下的 payload 选择不同于游离药物组合。**  
游离药物药敏数据不能直接等同于 ADC 释放后的胞内暴露。ADC 还涉及抗原表达、内吞、溶酶体释放和旁观者效应。

**我们的做法：建立 payload pair 推荐模型。**

输入包括：

- payload 作用机制；
- GDSC、PRISM、DepMap、CTRP 等药敏数据；
- ABC transporter、DNA damage response、microtubule、apoptosis 等耐药通路；
- 正常组织表达和毒性数据库；
- 靶点表达和内吞相关特征；
- 已知 ADC payload 的旁观者效应、亲疏水性和外排泵敏感性。

模型采用异构知识图谱或图神经网络，将 payload、细胞系、癌种、耐药基因、毒性端点和靶点表达连接起来。输出 payload pair 的综合评分，包括协同潜力、交叉耐药风险、毒性重叠风险和适合癌种。

### 四、可行性

该方向早期不依赖新 ADC 合成，可以先用公开数据完成模型原型。药敏数据、基因依赖数据、药物机制注释和癌种多组学数据均可公开获得。

验证也可以分层推进：

1. 用已有组合药敏数据回测模型是否能找回已知协同组合；
2. 用不同耐药背景细胞系测试 top-ranked payload pair；
3. 后续再把候选 payload pair 接入 ADC linker / DAR 设计。

该方向的优点是计算先行、实验验证成本相对低，适合作为生物信息学和计算药物设计切入 dual-payload ADC 的第一步。

### 五、定位说明

本方向不主张“发现某个全新 payload”。它的定位是方法学：**建立 dual-payload ADC payload pair 的理性推荐体系**。别人已经证明双 payload ADC 有临床前价值，我们要解决的是下一步更关键的问题：双 payload 到底应该怎么配。

---

## 方向二：linker 释放顺序与安全窗预测模型

**论文A·干实验：双 payload ADC 的 linker-catabolite 释放动力学与毒性窗口模型**

### 一、前景

dual-payload ADC 的关键不只是“接两个药”，而是两个药在体内以什么形式、什么速度、什么顺序释放。一个 payload 先释放可能起到增敏作用，另一个 payload 后释放可能负责主杀伤；也可能两个 payload 同时释放才有协同。如果释放顺序错误，双 payload 设计可能既不能增强疗效，还会增加游离毒素暴露。

Nature Chemistry 2024 综述已经把 multi-payload ADC 的 linker、偶联位点和 payload ratio 问题系统梳理出来。Scientific Reports 2024 则提供了多种 cleavable payload 的 LC-MS/MS 同步定量方法。这说明领域已经具备“测释放”的工具，但还缺少“预测释放”的模型。

因此，本方向的核心问题是：

**能否在合成前预测两个 payload 的释放曲线、释放顺序和潜在毒性窗口？**

### 二、相关工作

Nature Chemistry 2024 指出 homogeneous multi-payload ADC 的核心挑战包括 payload ratio、DAR、linker 稳定性、偶联位点和制造可控性。

Scientific Reports 2024 建立了同时定量 SN-38、MTX、DXd、MMAE、MMAF 和 calicheamicin 的 LC-MS/MS 方法，为多 payload ADC 的稳定性和安全性评价提供工具。

Scientific Reports 2017 证明 LC-MS 可以用于 ADC 合成过程中的 DAR 快速分析和质控。

这些工作共同说明：双 payload ADC 的分析基础正在形成，但还没有形成从分子结构到释放行为的预测模型。

### 三、不足与我们的做法

**不足一：现有研究偏“测量”，不偏“预测”。**  
LC-MS/MS 可以测游离 payload，但通常是在分子做出来之后测。它不能提前告诉我们哪个 linker 更可能产生理想释放顺序。

**不足二：真实 catabolite 没有被系统纳入模型。**  
不同 linker 释放出来的可能不是同一个分子。游离 payload、氨基酸-payload、linker残基-payload 在亲疏水性、膜通透性、外排泵敏感性和毒性上都可能不同。

**不足三：释放环境是组织特异的。**  
血浆、溶酶体和肿瘤微环境中的 pH、cathepsin、esterase、protease 水平不同，同一个 linker 在不同癌种中可能释放行为不同。

**我们的做法：建立 linker-catabolite 释放动力学模型。**

输入包括：

- linker 化学结构；
- payload 结构和 physicochemical properties；
- 可裂解位点；
- pH、cathepsin、esterase、protease 等微环境变量；
- LC-MS/MS 释放数据；
- 游离 payload 暴露和毒性端点。

模型采用分子图神经网络预测 linker cleavage half-life，并结合肿瘤微环境酶表达建立 context-aware release model。输出包括两个 payload 的释放曲线、先后释放顺序、游离 payload 风险和组织特异毒性窗口。

### 四、可行性

该方向可以先从公开 linker 和 payload 数据建立小规模模型，再通过体外实验逐步补充：

1. 血浆稳定性实验；
2. 溶酶体模拟体系释放实验；
3. cathepsin 或 pH 梯度释放实验；
4. LC-MS/MS 定量不同 catabolite。

已有 Scientific Reports 2024 的 payload 定量方法可作为方法学锚点。即使早期数据量有限，也可以先做半监督模型或物理约束模型。

### 五、定位说明

本方向不只是做 linker 对接或简单 QSAR。它的核心是把 **linker 结构、真实 catabolite、释放环境和毒性窗口** 连成一个模型。别人已经能测 payload 释放，我们要解决的是：在 ADC 做出来之前，先判断哪个 linker 设计更可能成功。

---

## 方向三：基于单细胞/空间组学的 dual-payload ADC 适应症筛选

**论文A·干实验：肿瘤异质性驱动的 dual-payload ADC 适应症与患者亚群预测模型**

### 一、前景

dual-payload ADC 最常见的理论优势是克服肿瘤异质性。但“异质性”不能只作为一句背景描述，它必须被量化。一个肿瘤是否适合 dual-payload ADC，至少取决于几个因素：

1. 靶点表达是否异质；
2. 靶点阳性细胞是否能有效内吞 ADC；
3. 靶点阴性细胞是否能通过旁观者效应被杀伤；
4. 不同克隆是否对不同 payload 有差异敏感性；
5. 既往治疗是否造成 payload 交叉耐药。

Nature Communications 2021 用 HER2 异质性模型证明 dual-drug ADC 可以改善临床前疗效。肺癌、乳腺癌和前列腺癌综述都把 dual-payload ADC 作为克服异质性的策略。但这些论文没有提供一个可迁移到不同癌种和患者的异质性评分。

因此，本方向的核心问题是：

**能否用单细胞、空间组学、IHC 和药敏数据预测哪些癌种或患者真正需要 dual-payload ADC？**

### 二、相关工作

Nature Communications 2021 直接在 HER2 异质性乳腺癌模型中验证 dual-drug ADC。

npj Precision Oncology 2023 将 dual-payload ADC 放入肺癌耐药和异质性治疗策略中。

npj Breast Cancer 2025 的两篇综述讨论乳腺癌 ADC 新策略和耐药机制，其中 multi-payload ADC 被视为克服耐药和异质性的方向。

npj Precision Oncology 2025 前列腺癌综述也单独讨论 dual payload ADCs。

这些工作共同说明：异质性是 dual-payload ADC 的核心应用理由，但还没有形成可计算、可验证的患者筛选方法。

### 三、不足与我们的做法

**不足一：异质性停留在概念层面。**  
多数论文说 dual-payload ADC 可以克服异质性，但没有定义什么程度的异质性值得使用双 payload。

**不足二：靶点表达和 payload 敏感性没有整合。**  
一个肿瘤靶点表达高，不代表它对两个 payload 都敏感；靶点表达异质，也不代表双 payload 一定有优势。

**不足三：旁观者效应和内吞能力没有统一建模。**  
payload 是否能扩散、ADC 是否能内吞、溶酶体释放是否充分，都会影响 dual-payload ADC 在异质性肿瘤中的表现。

**我们的做法：建立 dual-payload ADC 适应症筛选模型。**

输入包括：

- bulk RNA-seq；
- single-cell RNA-seq；
- spatial transcriptomics；
- IHC / IF 数据；
- ctDNA；
- 靶点内吞相关基因；
- payload 敏感性数据；
- 耐药通路；
- 旁观者效应相关理化性质。

模型输出一个 dual-payload ADC suitability score，包括靶点异质性评分、payload 互补性评分、内吞释放评分、旁观者效应评分和耐药克隆覆盖评分。

### 四、可行性

该方向最适合生物信息学切入。TCGA、CPTAC、Human Protein Atlas、公开 single-cell 和 spatial 数据均可作为初始数据源。早期可以不依赖新的 ADC 实验，而是先建立癌种和患者亚群排序。

验证路径可以分三步：

1. 用公开队列计算不同癌种的靶点异质性；
2. 用 DepMap / PRISM 药敏数据估计 payload 敏感性；
3. 用混合细胞系、organoid 或 PDX 数据验证高评分模型是否更适合 dual-payload ADC。

### 五、定位说明

本方向不主张“某个靶点就是最好的 dual-payload ADC 靶点”。它的定位是建立一个适应症筛选框架，把“克服异质性”从概念变成可计算标准。别人证明了某个模型中双 payload 有效，我们要回答的是：哪些真实肿瘤最像这个模型。

---

## 方向四：dual-payload ADC CMC 智能质控与转化风险评分

**论文A·干实验：基于 LC-MS / DAR / payload ratio 的 dual-payload ADC 质量属性与转化风险模型**

### 一、前景

dual-payload ADC 的临床转化风险不只来自药效，也来自 CMC。相比单 payload ADC，双 payload ADC 需要同时控制：

- 总 DAR；
- 两种 payload 的比例；
- 偶联位点分布；
- 游离 payload；
- 聚集；
- 血浆稳定性；
- 批间一致性；
- 两个 payload 的释放曲线。

Scientific Reports 2017 和 2024 论文分别提供了 DAR 分析和多 payload 定量方法。Nature Chemistry 2024 则从化学层面说明 multi-payload ADC 生成复杂、均一性难度高。Nature Reviews Drug Discovery 2025/2026 的新闻显示 dual-payload ADC 已进入临床和产业布局，但并没有给出成熟 CMC 或临床结果。

因此，本方向的核心问题是：

**能否建立一个从 CMC 数据预测质量风险和临床前转化风险的 AI 模型？**

### 二、相关工作

Scientific Reports 2017 证明 LC-MS 可用于 ADC DAR 快速分析和过程优化。

Scientific Reports 2024 建立了多种 ADC cleavable payload 的 LC-MS/MS 定量流程。

Nature Chemistry 2024 系统总结 homogeneous multi-payload ADC 的化学和技术挑战。

Nature Reviews Drug Discovery 2025/2026 提示 dual-payload ADC 正在进入临床和产业阶段，但这些文章不是疗效证据，也不是 CMC 成熟证据。

### 三、不足与我们的做法

**不足一：分析方法与风险判断脱节。**  
LC-MS 能测 DAR，LC-MS/MS 能测游离 payload，但测量结果如何映射到放大生产风险、稳定性风险和毒性风险，尚未建立模型。

**不足二：双 payload ADC 的 CQA 维度过多。**  
人工判断很难同时处理总 DAR、payload ratio、聚集、释放、游离 payload 和批间一致性。

**不足三：临床前转化风险缺少整合评分。**  
进入临床或产业交易不能证明成功。领域需要提前判断哪些设计可能因为 CMC、毒性或患者分层失败。

**我们的做法：建立 CMC 智能质控 + 转化风险模型。**

输入包括：

- LC-MS 原始峰图；
- DAR；
- payload ratio；
- SEC-HPLC / HIC-HPLC；
- 游离 payload；
- 反应条件；
- 批次数据；
- 稳定性数据；
- 动物药效、毒理和 PK/PD；
- 历史 ADC 项目成功/失败信息。

模型包括两层：

1. 质量属性模型：识别异常峰、payload ratio 偏移、聚集风险和批间漂移；
2. 转化风险模型：整合 CMC、PK/PD、毒性和药效特征，输出临床前转化风险评分。

### 四、可行性

早期可以先从质控模型做起，因为 Scientific Reports 两篇论文已经提供了明确的方法学基础。若真实 CMC 数据有限，可以用模拟峰图和小规模实验数据建立原型。

后续可引入 ADC 项目的公开信息，构建 ADC knowledge graph，对已上市、失败、中止和临床前项目进行回顾性风险建模。

### 五、定位说明

本方向不把 AI 用来替代质量分析，而是把已有质量分析结果转化为风险判断。别人已经能测 DAR 和游离 payload，我们要进一步回答：这些测量结果是否提示某个 dual-payload ADC 设计难以放大、难以稳定或难以转化。

---

## 总体推荐优先级

| 优先级 | 方向 | 推荐理由 | 主要风险 |
|---|---|---|---|
| 1 | payload pair 智能推荐模型 | 最适合生信/计算药物设计切入，公开数据丰富，能直接回应“payload 怎么配” | 游离药物药敏不能完全代表 ADC 胞内暴露 |
| 2 | linker 释放顺序与安全窗预测模型 | 最贴近 ADC 药物研发本体，能解决双 payload 设计核心变量 | linker release 数据分散，可能需要自建小数据集 |
| 3 | 单细胞/空间组学适应症筛选模型 | 最符合“克服异质性”的 dual-payload ADC 核心叙事 | RNA 与蛋白/IHC 不完全一致，需要校正 |
| 4 | CMC 智能质控与转化风险评分 | 转化价值高，但需要真实 LC-MS/CMC 数据支持 | 数据获取难度较高 |

## 汇报用总结

基于 14 篇 CNS / Nature Portfolio 论文可以看出，dual-payload ADC 已经形成明确方向，但尚未形成成熟的设计科学。现有文献解决了三个层面的问题：证明双 payload ADC 在临床前模型中可能有效，建立了 DAR 和游离 payload 分析方法，并从综述层面总结了 multi-payload ADC 的化学和应用潜力。

但这些工作共同暴露出更关键的不足：payload 组合仍偏经验驱动，payload ratio 和 DAR 缺少预测模型，linker 释放顺序缺少可泛化规律，肿瘤异质性没有被系统建模，双 payload 毒性叠加和安全窗仍难预测，临床前到临床转化风险缺少量化工具。

因此，我们可以用 AI 做的不是泛泛地“设计 ADC”，而是针对 dual-payload ADC 的关键决策环节建立模型：用药敏组学和耐药通路推荐 payload pair，用 linker 结构和 LC-MS 数据预测释放顺序，用单细胞/空间组学筛选适应症，用 CMC 数据判断质量与转化风险。这样才能真正从别人工作的不足中提出可执行、可验证、具有交叉学科价值的研究方向。

## 参考文献（仅 CNS / Nature Portfolio 体系）

1. Real-Time Analysis on Drug-Antibody Ratio of Antibody-Drug Conjugates for Synthesis, Process Optimization, and Quality Control. Scientific Reports, 2017. https://www.nature.com/articles/s41598-017-08151-2
2. Antibody-drug conjugates with dual payloads for combating breast tumor heterogeneity and drug resistance. Nature Communications, 2021. https://www.nature.com/articles/s41467-021-23793-7
3. Antibody-drug conjugates in lung cancer: dawn of a new era? npj Precision Oncology, 2023. https://www.nature.com/articles/s41698-022-00338-9
4. Exploring the next generation of antibody-drug conjugates. Nature Reviews Clinical Oncology, 2024. https://www.nature.com/articles/s41571-023-00850-2
5. Homogeneous multi-payload antibody-drug conjugates. Nature Chemistry, 2024. https://www.nature.com/articles/s41557-024-01507-y
6. A simple and highly sensitive LC-MS workflow for characterization and quantification of ADC cleavable payloads. Scientific Reports, 2024. https://www.nature.com/articles/s41598-024-61522-4
7. Spatially precise chemo-radio-immunotherapy by antibody drug conjugate directed tumor radiosensitization to potentiate immunotherapies. npj Precision Oncology, 2025. https://www.nature.com/articles/s41698-025-00885-x
8. Novel treatment approaches utilizing antibody-drug conjugates in breast cancer. npj Breast Cancer, 2025. https://www.nature.com/articles/s41523-025-00743-w
9. Antibody-drug conjugates in breast cancer: mechanisms of resistance and future therapeutic perspectives. npj Breast Cancer, 2025. https://www.nature.com/articles/s41523-025-00829-5
10. Immune-checkpoint targeting drug conjugates: a novel class of promising therapeutic agents for cancer treatment. npj Precision Oncology, 2025. https://www.nature.com/articles/s41698-025-01011-7
11. The evolving landscape of antibody-drug conjugates (ADCs) for treatment of prostate cancer. npj Precision Oncology, 2025. https://www.nature.com/articles/s41698-025-01131-0
12. Dual-payload ADCs move into first oncology clinical trials. Nature Reviews Drug Discovery, 2025. https://www.nature.com/articles/d41573-025-00121-y
13. Supramolecular coiled-coil peptide platform for site-specific antibody drug conjugate engineering. Nature Communications, 2026. https://www.nature.com/articles/s41467-026-70094-y
14. Eli Lilly inks dual-payload ADCs deal. Nature Reviews Drug Discovery, 2026. https://www.nature.com/articles/d41573-026-00079-5
