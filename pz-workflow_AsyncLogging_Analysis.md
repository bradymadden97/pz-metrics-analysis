* * *

<center>

# Overview

[Results](#table0)  
[Data](#table1)  
</center>

* * *

<a name="table0">

# Sheet 1: _Results_

</a>

<table cellspacing="0" border="0">

<tbody>

<tr>

<td height="17" align="center">**Action**</td>

<td colspan="2" valign="middle" align="center">**Average Action Time (sec)**</td>

<td colspan="2" valign="middle" align="center">**Logging as % of total time**</td>

</tr>

<tr>

<td align="center">**Sync**</td>

<td align="center">**Async**</td>

<td align="center">**Sync**</td>

<td align="center">**Async**</td>

</tr>

<tr>

<td height="17" align="left">**getAllAlerts**</td>

<td sdval="0.25864361925" sdnum="1033;" align="center">0.2586436193</td>

<td sdval="0.230043888333333" sdnum="1033;" align="center">0.2300438883</td>

<td sdval="88.8920565382241" sdnum="1033;" align="center">88.8920565382</td>

<td sdval="0.104145443601379" sdnum="1033;" align="center">0.1041454436</td>

</tr>

<tr>

<td height="17" align="left">**getAllEvents**</td>

<td sdval="10.447978067125" sdnum="1033;" align="center">10.4479780671</td>

<td sdval="9.350594947" sdnum="1033;" align="center">9.350594947</td>

<td sdval="16.7622780366127" sdnum="1033;" align="center">16.7622780366</td>

<td sdval="0.00152895598140047" sdnum="1033;" align="center">0.001528956</td>

</tr>

<tr>

<td height="17" align="left">**getAllEventTypes**</td>

<td sdval="0.847912171" sdnum="1033;" align="center">0.847912171</td>

<td sdval="0.592580485666667" sdnum="1033;" align="center">0.5925804857</td>

<td sdval="70.5750694497912" sdnum="1033;" align="center">70.5750694498</td>

<td sdval="0.0603118046006795" sdnum="1033;" align="center">0.0603118046</td>

</tr>

<tr>

<td height="17" align="left">**getAllTriggers**</td>

<td sdval="11.0053407987143" sdnum="1033;" align="center">11.0053407987</td>

<td sdval="10.2032669396667" sdnum="1033;" align="center">10.2032669397</td>

<td sdval="15.7014790298825" sdnum="1033;" align="center">15.7014790299</td>

<td sdval="0.00188544878706323" sdnum="1033;" align="center">0.0018854488</td>

</tr>

<tr>

<td height="17" align="left">**getAlert**</td>

<td sdval="1.0359849575" sdnum="1033;" align="center">1.0359849575</td>

<td sdval="0.850174516666667" sdnum="1033;" align="center">0.8501745167</td>

<td sdval="67.0783010872927" sdnum="1033;" align="center">67.0783010873</td>

<td sdval="0.0277967195034108" sdnum="1033;" align="center">0.0277967195</td>

</tr>

<tr>

<td height="17" align="left">**getEvent**</td>

<td sdval="0.833482415" sdnum="1033;" align="center">0.833482415</td>

<td sdval="1.01196275833333" sdnum="1033;" align="center">1.0119627583</td>

<td sdval="67.7295933431639" sdnum="1033;" align="center">67.7295933432</td>

<td sdval="0.0154028548063576" sdnum="1033;" align="center">0.0154028548</td>

</tr>

<tr>

<td height="17" align="left">**getEventType**</td>

<td sdval="0.918714694666667" sdnum="1033;" align="center">0.9187146947</td>

<td sdval="0.592580485666667" sdnum="1033;" align="center">0.5925804857</td>

<td sdval="66.9714884485034" sdnum="1033;" align="center">66.9714884485</td>

<td sdval="0.0603118046006795" sdnum="1033;" align="center">0.0603118046</td>

</tr>

<tr>

<td height="17" align="left">**getTrigger**</td>

<td sdval="1.808133922" sdnum="1033;" align="center">1.808133922</td>

<td sdval="1.687141434" sdnum="1033;" align="center">1.687141434</td>

<td sdval="53.8803674170704" sdnum="1033;" align="center">53.8803674171</td>

<td sdval="0.00690082226486682" sdnum="1033;" align="center">0.0069008223</td>

</tr>

<tr>

<td colspan="2" valign="middle" align="center">**Average Logging Time (sec)**</td>

</tr>

<tr>

<td align="center">**Sync**</td>

<td align="center">**Async**</td>

</tr>

<tr>

<td height="17" align="left">**Pre action Log**</td>

<td sdval="0.993680174333333" sdnum="1033;" align="center">0.9936801743</td>

<td sdval="0.0000568082619047619" sdnum="1033;0;0.000E+00" align="center">5.681E-05</td>

</tr>

<tr>

<td height="17" align="left">**Post action Log**</td>

<td sdval="1.03800316492593" sdnum="1033;" align="center">1.0380031649</td>

<td sdval="0.000150020761904762" sdnum="1033;" align="center">0.0001500208</td>

</tr>

<tr>

<td height="17" align="left">**Logs as % of total**</td>

<td sdval="35.815834114764" sdnum="1033;" align="center">35.8158341148</td>

<td sdval="0.00616247291305686" sdnum="1033;" align="center">0.0061624729</td>

</tr>

<tr>

<td height="17" align="left">**function time**</td>

</tr>

</tbody>

</table>

* * *

<a name="table1">

# Sheet 2: _Data_

</a>

<table cellspacing="0" border="0">

<tbody>

<tr>

<td colspan="4" valign="middle" height="17" align="center">**With Async = False**</td>

<td colspan="4" valign="middle" align="center">**with Async = True**</td>

</tr>

<tr>

<td valign="middle" height="17" align="center">**Function**</td>

<td align="center">**Pre Action Log**</td>

<td align="center">**Action**</td>

<td align="center">**Post Action Log**</td>

<td valign="middle" align="center">**Function**</td>

<td align="center">**Pre Action Log**</td>

<td align="center">**Action**</td>

<td align="center">**Post Action Log**</td>

</tr>

<tr>

<td colspan="3" valign="middle" align="center">Time in Milliseconds</td>

<td colspan="3" valign="middle" align="center">Time in Milliseconds</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="1146790936" sdnum="1033;" align="center">1146790936</td>

<td sdval="1193908756" sdnum="1033;" align="center">1193908756</td>

<td sdval="1331916433" sdnum="1033;" align="center">1331916433</td>

<td align="center">getAlert</td>

<td sdval="39650" sdnum="1033;" align="center">39650</td>

<td sdval="758606224" sdnum="1033;" align="center">758606224</td>

<td sdval="195020" sdnum="1033;" align="center">195020</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="877725775" sdnum="1033;" align="center">877725775</td>

<td sdval="968523839" sdnum="1033;" align="center">968523839</td>

<td sdval="998769476" sdnum="1033;" align="center">998769476</td>

<td align="center">getAlert</td>

<td sdval="37516" sdnum="1033;" align="center">37516</td>

<td sdval="763700848" sdnum="1033;" align="center">763700848</td>

<td sdval="357785" sdnum="1033;" align="center">357785</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="934479532" sdnum="1033;" valign="middle" align="center">934479532</td>

<td sdval="956301580" sdnum="1033;" align="center">956301580</td>

<td sdval="999027473" sdnum="1033;" valign="middle" align="center">999027473</td>

<td align="center">getAlert</td>

<td sdval="68926" sdnum="1033;" align="center">68926</td>

<td sdval="852822602" sdnum="1033;" align="center">852822602</td>

<td sdval="90638" sdnum="1033;" align="center">90638</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="1125700575" sdnum="1033;" align="center">1125700575</td>

<td sdval="1094942870" sdnum="1033;" align="center">1094942870</td>

<td sdval="1154731138" sdnum="1033;" align="center">1154731138</td>

<td align="center">getAlert</td>

<td sdval="79207" sdnum="1033;" align="center">79207</td>

<td sdval="1362295859" sdnum="1033;" align="center">1362295859</td>

<td sdval="270673" sdnum="1033;" align="center">270673</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="1010367646" sdnum="1033;" align="center">1010367646</td>

<td sdval="1156027507" sdnum="1033;" align="center">1156027507</td>

<td sdval="1174459060" sdnum="1033;" align="center">1174459060</td>

<td align="center">getAlert</td>

<td sdval="56481" sdnum="1033;" align="center">56481</td>

<td sdval="683951232" sdnum="1033;" align="center">683951232</td>

<td sdval="88530" sdnum="1033;" align="center">88530</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="712194147" sdnum="1033;" align="center">712194147</td>

<td sdval="704308472" sdnum="1033;" align="center">704308472</td>

<td sdval="928702636" sdnum="1033;" align="center">928702636</td>

<td align="center">getAlert</td>

<td sdval="55861" sdnum="1033;" align="center">55861</td>

<td sdval="679670335" sdnum="1033;" align="center">679670335</td>

<td sdval="78031" sdnum="1033;" align="center">78031</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="962580905" sdnum="1033;" align="center">962580905</td>

<td sdval="1072343207" sdnum="1033;" align="center">1072343207</td>

<td sdval="1140551895" sdnum="1033;" align="center">1140551895</td>

<td align="center">getAllAlerts</td>

<td sdval="47160" sdnum="1033;" align="center">47160</td>

<td sdval="238634871" sdnum="1033;" align="center">238634871</td>

<td sdval="381100" sdnum="1033;" align="center">381100</td>

</tr>

<tr>

<td height="17" align="center">getAlert</td>

<td sdval="1218251180" sdnum="1033;" align="center">1218251180</td>

<td sdval="1141523429" sdnum="1033;" align="center">1141523429</td>

<td sdval="1170391481" sdnum="1033;" align="center">1170391481</td>

<td align="center">getAllAlerts</td>

<td sdval="70843" sdnum="1033;" align="center">70843</td>

<td sdval="240666835" sdnum="1033;" align="center">240666835</td>

<td sdval="23209" sdnum="1033;" align="center">23209</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1014163872" sdnum="1033;" align="center">1014163872</td>

<td sdval="292184404" sdnum="1033;" align="center">292184404</td>

<td sdval="1194989754" sdnum="1033;" align="center">1194989754</td>

<td align="center">getAllAlerts</td>

<td sdval="55313" sdnum="1033;" align="center">55313</td>

<td sdval="241646251" sdnum="1033;" align="center">241646251</td>

<td sdval="26464" sdnum="1033;" align="center">26464</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1087109297" sdnum="1033;" align="center">1087109297</td>

<td sdval="247098883" sdnum="1033;" align="center">247098883</td>

<td sdval="1018803679" sdnum="1033;" align="center">1018803679</td>

<td align="center">getAllAlerts</td>

<td sdval="44930" sdnum="1033;" align="center">44930</td>

<td sdval="285836158" sdnum="1033;" align="center">285836158</td>

<td sdval="423925" sdnum="1033;" align="center">423925</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="955482079" sdnum="1033;" align="center">955482079</td>

<td sdval="217492072" sdnum="1033;" align="center">217492072</td>

<td sdval="1019348111" sdnum="1033;" align="center">1019348111</td>

<td align="center">getAllAlerts</td>

<td sdval="52117" sdnum="1033;" align="center">52117</td>

<td sdval="144074523" sdnum="1033;" align="center">144074523</td>

<td sdval="256163" sdnum="1033;" align="center">256163</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1013066518" sdnum="1033;" align="center">1013066518</td>

<td sdval="291945503" sdnum="1033;" align="center">291945503</td>

<td sdval="1165588225" sdnum="1033;" align="center">1165588225</td>

<td align="center">getAllAlerts</td>

<td sdval="32816" sdnum="1033;" align="center">32816</td>

<td sdval="229404692" sdnum="1033;" align="center">229404692</td>

<td sdval="24940" sdnum="1033;" align="center">24940</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="719193450" sdnum="1033;" align="center">719193450</td>

<td sdval="205289640" sdnum="1033;" align="center">205289640</td>

<td sdval="736313267" sdnum="1033;" align="center">736313267</td>

<td align="center">getAllEvents</td>

<td sdval="72966" sdnum="1033;" align="center">72966</td>

<td sdval="9665663578" sdnum="1033;" align="center">9665663578</td>

<td sdval="82124" sdnum="1033;" align="center">82124</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1072871417" sdnum="1033;" valign="middle" align="center">1072871417</td>

<td sdval="239259105" sdnum="1033;" align="center">239259105</td>

<td sdval="997021696" sdnum="1033;" align="center">997021696</td>

<td align="center">getAllEvents</td>

<td sdval="36120" sdnum="1033;" align="center">36120</td>

<td sdval="9683549921" sdnum="1033;" align="center">9683549921</td>

<td sdval="42107" sdnum="1033;" align="center">42107</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1119335348" sdnum="1033;" align="center">1119335348</td>

<td sdval="282231914" sdnum="1033;" align="center">282231914</td>

<td sdval="1150718001" sdnum="1033;" align="center">1150718001</td>

<td align="center">getAllEvents</td>

<td sdval="41242" sdnum="1033;" align="center">41242</td>

<td sdval="11812304527" sdnum="1033;" align="center">11812304527</td>

<td sdval="81475" sdnum="1033;" align="center">81475</td>

</tr>

<tr>

<td height="17" align="center">getAllAlerts</td>

<td sdval="1145235803" sdnum="1033;" align="center">1145235803</td>

<td sdval="293647433" sdnum="1033;" align="center">293647433</td>

<td sdval="1149261643" sdnum="1033;" align="center">1149261643</td>

<td align="center">getAllEvents</td>

<td sdval="54118" sdnum="1033;" align="center">54118</td>

<td sdval="9514787358" sdnum="1033;" align="center">9514787358</td>

<td sdval="77812" sdnum="1033;" align="center">77812</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="1162071922" sdnum="1033;" align="center">1162071922</td>

<td sdval="11678369026" sdnum="1033;" align="center">11678369026</td>

<td sdval="1277529059" sdnum="1033;" align="center">1277529059</td>

<td align="center">getAllEvents</td>

<td sdval="72652" sdnum="1033;" align="center">72652</td>

<td sdval="7510387148" sdnum="1033;" align="center">7510387148</td>

<td sdval="80978" sdnum="1033;" align="center">80978</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="938304196" sdnum="1033;" align="center">938304196</td>

<td sdval="11314561586" sdnum="1033;" align="center">11314561586</td>

<td sdval="966357546" sdnum="1033;" align="center">966357546</td>

<td align="center">getAllEvents</td>

<td sdval="33117" sdnum="1033;" align="center">33117</td>

<td sdval="7916877150" sdnum="1033;" align="center">7916877150</td>

<td sdval="183101" sdnum="1033;" align="center">183101</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="903961812" sdnum="1033;" align="center">903961812</td>

<td sdval="10022294235" sdnum="1033;" align="center">10022294235</td>

<td sdval="1072500793" sdnum="1033;" align="center">1072500793</td>

<td align="center">getAllEventTypes</td>

<td sdval="55173" sdnum="1033;" align="center">55173</td>

<td sdval="570287695" sdnum="1033;" align="center">570287695</td>

<td sdval="35962" sdnum="1033;" align="center">35962</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="1154888285" sdnum="1033;" align="center">1154888285</td>

<td sdval="11678141997" sdnum="1033;" align="center">11678141997</td>

<td sdval="1156526416" sdnum="1033;" align="center">1156526416</td>

<td align="center">getAllEventTypes</td>

<td sdval="123249" sdnum="1033;" align="center">123249</td>

<td sdval="719364479" sdnum="1033;" align="center">719364479</td>

<td sdval="293737" sdnum="1033;" align="center">293737</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="894126617" sdnum="1033;" align="center">894126617</td>

<td sdval="7357956969" sdnum="1033;" align="center">7357956969</td>

<td sdval="739660842" sdnum="1033;" align="center">739660842</td>

<td align="center">getAllEventTypes</td>

<td sdval="54100" sdnum="1033;" align="center">54100</td>

<td sdval="629994568" sdnum="1033;" align="center">629994568</td>

<td sdval="389961" sdnum="1033;" align="center">389961</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="966828694" sdnum="1033;" align="center">966828694</td>

<td sdval="8364638823" sdnum="1033;" align="center">8364638823</td>

<td sdval="1009638327" sdnum="1033;" align="center">1009638327</td>

<td align="center">getAllEventTypes</td>

<td sdval="61081" sdnum="1033;" align="center">61081</td>

<td sdval="626463753" sdnum="1033;" align="center">626463753</td>

<td sdval="361305" sdnum="1033;" align="center">361305</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="1108724790" sdnum="1033;" align="center">1108724790</td>

<td sdval="11529714461" sdnum="1033;" align="center">11529714461</td>

<td sdval="1150460334" sdnum="1033;" align="center">1150460334</td>

<td align="center">getAllEventTypes</td>

<td sdval="54075" sdnum="1033;" align="center">54075</td>

<td sdval="515230561" sdnum="1033;" align="center">515230561</td>

<td sdval="619652" sdnum="1033;" align="center">619652</td>

</tr>

<tr>

<td height="17" align="center">getAllEvents</td>

<td sdval="1146502132" sdnum="1033;" align="center">1146502132</td>

<td sdval="11638147440" sdnum="1033;" align="center">11638147440</td>

<td sdval="1183893849" sdnum="1033;" align="center">1183893849</td>

<td align="center">getAllEventTypes</td>

<td sdval="51906" sdnum="1033;" align="center">51906</td>

<td sdval="494141858" sdnum="1033;" align="center">494141858</td>

<td sdval="45469" sdnum="1033;" align="center">45469</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="1307377694" sdnum="1033;" align="center">1307377694</td>

<td sdval="860841086" sdnum="1033;" align="center">860841086</td>

<td sdval="1167645882" sdnum="1033;" align="center">1167645882</td>

<td align="center">getAllTriggers</td>

<td sdval="31589" sdnum="1033;" align="center">31589</td>

<td sdval="11607014198" sdnum="1033;" align="center">11607014198</td>

<td sdval="29702" sdnum="1033;" align="center">29702</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="941264386" sdnum="1033;" align="center">941264386</td>

<td sdval="705870464" sdnum="1033;" align="center">705870464</td>

<td sdval="912217074" sdnum="1033;" align="center">912217074</td>

<td align="center">getAllTriggers</td>

<td sdval="52665" sdnum="1033;" align="center">52665</td>

<td sdval="10125900458" sdnum="1033;" align="center">10125900458</td>

<td sdval="38904" sdnum="1033;" align="center">38904</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="964803704" sdnum="1033;" align="center">964803704</td>

<td sdval="724890272" sdnum="1033;" align="center">724890272</td>

<td sdval="974099034" sdnum="1033;" align="center">974099034</td>

<td align="center">getAllTriggers</td>

<td sdval="55048" sdnum="1033;" align="center">55048</td>

<td sdval="11970245592" sdnum="1033;" align="center">11970245592</td>

<td sdval="369601" sdnum="1033;" align="center">369601</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="1153240371" sdnum="1033;" align="center">1153240371</td>

<td sdval="1528927197" sdnum="1033;" align="center">1528927197</td>

<td sdval="1158949533" sdnum="1033;" align="center">1158949533</td>

<td align="center">getAllTriggers</td>

<td sdval="59407" sdnum="1033;" align="center">59407</td>

<td sdval="11611858658" sdnum="1033;" align="center">11611858658</td>

<td sdval="252811" sdnum="1033;" align="center">252811</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="677680334" sdnum="1033;" align="center">677680334</td>

<td sdval="545594338" sdnum="1033;" align="center">545594338</td>

<td sdval="752874761" sdnum="1033;" align="center">752874761</td>

<td align="center">getAllTriggers</td>

<td sdval="69812" sdnum="1033;" align="center">69812</td>

<td sdval="7777787626" sdnum="1033;" align="center">7777787626</td>

<td sdval="80938" sdnum="1033;" align="center">80938</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="929059165" sdnum="1033;" align="center">929059165</td>

<td sdval="709460004" sdnum="1033;" align="center">709460004</td>

<td sdval="985942172" sdnum="1033;" align="center">985942172</td>

<td align="center">getAllTriggers</td>

<td sdval="34836" sdnum="1033;" align="center">34836</td>

<td sdval="8126795106" sdnum="1033;" align="center">8126795106</td>

<td sdval="78973" sdnum="1033;" align="center">78973</td>

</tr>

<tr>

<td height="17" align="center">getAllEventTypes</td>

<td sdval="1156817066" sdnum="1033;" align="center">1156817066</td>

<td sdval="859801836" sdnum="1033;" align="center">859801836</td>

<td sdval="1153923851" sdnum="1033;" align="center">1153923851</td>

<td align="center">getEvent</td>

<td sdval="53878" sdnum="1033;" align="center">53878</td>

<td sdval="980689674" sdnum="1033;" align="center">980689674</td>

<td sdval="78788" sdnum="1033;" align="center">78788</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="1152813279" sdnum="1033;" align="center">1152813279</td>

<td sdval="12239210660" sdnum="1033;" align="center">12239210660</td>

<td sdval="1041702101" sdnum="1033;" align="center">1041702101</td>

<td align="center">getEvent</td>

<td sdval="89878" sdnum="1033;" align="center">89878</td>

<td sdval="1500908501" sdnum="1033;" align="center">1500908501</td>

<td sdval="80293" sdnum="1033;" align="center">80293</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="876537314" sdnum="1033;" align="center">876537314</td>

<td sdval="10304400050" sdnum="1033;" align="center">10304400050</td>

<td sdval="1007158070" sdnum="1033;" align="center">1007158070</td>

<td align="center">getEvent</td>

<td sdval="85015" sdnum="1033;" align="center">85015</td>

<td sdval="1131030245" sdnum="1033;" align="center">1131030245</td>

<td sdval="25140" sdnum="1033;" align="center">25140</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="981233591" sdnum="1033;" align="center">981233591</td>

<td sdval="10429422761" sdnum="1033;" align="center">10429422761</td>

<td sdval="990506241" sdnum="1033;" align="center">990506241</td>

<td align="center">getEvent</td>

<td sdval="95612" sdnum="1033;" align="center">95612</td>

<td sdval="747020266" sdnum="1033;" align="center">747020266</td>

<td sdval="82973" sdnum="1033;" align="center">82973</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="1129827164" sdnum="1033;" align="center">1129827164</td>

<td sdval="12099743311" sdnum="1033;" align="center">12099743311</td>

<td sdval="1067650847" sdnum="1033;" align="center">1067650847</td>

<td align="center">getEvent</td>

<td sdval="29411" sdnum="1033;" align="center">29411</td>

<td sdval="725708445" sdnum="1033;" align="center">725708445</td>

<td sdval="26220" sdnum="1033;" align="center">26220</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="886173640" sdnum="1033;" align="center">886173640</td>

<td sdval="9498445429" sdnum="1033;" align="center">9498445429</td>

<td sdval="1003746128" sdnum="1033;" align="center">1003746128</td>

<td align="center">getEvent</td>

<td sdval="34084" sdnum="1033;" align="center">34084</td>

<td sdval="986419419" sdnum="1033;" align="center">986419419</td>

<td sdval="254079" sdnum="1033;" align="center">254079</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="948862540" sdnum="1033;" align="center">948862540</td>

<td sdval="10358865171" sdnum="1033;" align="center">10358865171</td>

<td sdval="988240586" sdnum="1033;" align="center">988240586</td>

<td align="center">getEventType</td>

<td sdval="80600" sdnum="1033;" align="center">80600</td>

<td sdval="712667621" sdnum="1033;" align="center">712667621</td>

<td sdval="86853" sdnum="1033;" align="center">86853</td>

</tr>

<tr>

<td height="17" align="center">getAllTriggers</td>

<td sdval="1118266575" sdnum="1033;" align="center">1118266575</td>

<td sdval="12107298209" sdnum="1033;" align="center">12107298209</td>

<td sdval="1156298733" sdnum="1033;" align="center">1156298733</td>

<td align="center">getEventType</td>

<td sdval="51731" sdnum="1033;" align="center">51731</td>

<td sdval="1042515382" sdnum="1033;" align="center">1042515382</td>

<td sdval="88541" sdnum="1033;" align="center">88541</td>

</tr>

<tr>

<td height="17" align="center">getEvent</td>

<td sdval="998307597" sdnum="1033;" align="center">998307597</td>

<td sdval="968300637" sdnum="1033;" align="center">968300637</td>

<td sdval="1009809567" sdnum="1033;" align="center">1009809567</td>

<td align="center">getEventType</td>

<td sdval="55656" sdnum="1033;" align="center">55656</td>

<td sdval="706164380" sdnum="1033;" align="center">706164380</td>

<td sdval="23697" sdnum="1033;" align="center">23697</td>

</tr>

<tr>

<td height="17" align="center">getEvent</td>

<td sdval="765399585" sdnum="1033;" align="center">765399585</td>

<td sdval="696037025" sdnum="1033;" align="center">696037025</td>

<td sdval="745810113" sdnum="1033;" align="center">745810113</td>

<td align="center">getTrigger</td>

<td sdval="55360" sdnum="1033;" align="center">55360</td>

<td sdval="1518622704" sdnum="1033;" align="center">1518622704</td>

<td sdval="83717" sdnum="1033;" align="center">83717</td>

</tr>

<tr>

<td height="17" align="center">getEvent</td>

<td sdval="742612689" sdnum="1033;" align="center">742612689</td>

<td sdval="710939789" sdnum="1033;" align="center">710939789</td>

<td sdval="755458131" sdnum="1033;" align="center">755458131</td>

<td align="center">getTrigger</td>

<td sdval="70431" sdnum="1033;" align="center">70431</td>

<td sdval="2135769623" sdnum="1033;" align="center">2135769623</td>

<td sdval="83051" sdnum="1033;" align="center">83051</td>

</tr>

<tr>

<td height="17" align="center">getEvent</td>

<td sdval="996585582" sdnum="1033;" align="center">996585582</td>

<td sdval="958652209" sdnum="1033;" align="center">958652209</td>

<td sdval="983316228" sdnum="1033;" align="center">983316228</td>

<td align="center">getTrigger</td>

<td sdval="30315" sdnum="1033;" align="center">30315</td>

<td sdval="1407031975" sdnum="1033;" align="center">1407031975</td>

<td sdval="26430" sdnum="1033;" align="center">26430</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="944389498" sdnum="1033;" align="center">944389498</td>

<td sdval="985928001" sdnum="1033;" align="center">985928001</td>

<td sdval="993302441" sdnum="1033;" align="center">993302441</td>

<td align="center">**Averages**</td>

<td sdval="56808.2619047619" sdnum="1033;" align="center">56808.2619047619</td>

<td sdval="3356059830.92857" sdnum="1033;" align="center">3356059830.92857</td>

<td sdval="150020.761904762" sdnum="1033;" align="center">150020.761904762</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="1024677821" sdnum="1033;" align="center">1024677821</td>

<td sdval="737019059" sdnum="1033;" align="center">737019059</td>

<td sdval="749717202" sdnum="1033;" align="center">749717202</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="855825707" sdnum="1033;" align="center">855825707</td>

<td sdval="776407865" sdnum="1033;" align="center">776407865</td>

<td sdval="756797616" sdnum="1033;" align="center">756797616</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="706470209" sdnum="1033;" align="center">706470209</td>

<td sdval="733932666" sdnum="1033;" align="center">733932666</td>

<td sdval="718354541" sdnum="1033;" align="center">718354541</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="1097067844" sdnum="1033;" align="center">1097067844</td>

<td sdval="1132634933" sdnum="1033;" align="center">1132634933</td>

<td sdval="1029062215" sdnum="1033;" align="center">1029062215</td>

</tr>

<tr>

<td height="17" align="center">getEventType</td>

<td sdval="1132830717" sdnum="1033;" align="center">1132830717</td>

<td sdval="1146365644" sdnum="1033;" align="center">1146365644</td>

<td sdval="1168700073" sdnum="1033;" align="center">1168700073</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="953808765" sdnum="1033;" align="center">953808765</td>

<td sdval="1955358835" sdnum="1033;" align="center">1955358835</td>

<td sdval="991979602" sdnum="1033;" align="center">991979602</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="969674948" sdnum="1033;" align="center">969674948</td>

<td sdval="1447959460" sdnum="1033;" align="center">1447959460</td>

<td sdval="2058519114" sdnum="1033;" align="center">2058519114</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="924694408" sdnum="1033;" align="center">924694408</td>

<td sdval="1461673831" sdnum="1033;" align="center">1461673831</td>

<td sdval="750824458" sdnum="1033;" align="center">750824458</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="699254984" sdnum="1033;" align="center">699254984</td>

<td sdval="1439428598" sdnum="1033;" align="center">1439428598</td>

<td sdval="755850178" sdnum="1033;" align="center">755850178</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="1075086215" sdnum="1033;" align="center">1075086215</td>

<td sdval="2271044496" sdnum="1033;" align="center">2271044496</td>

<td sdval="1147457212" sdnum="1033;" align="center">1147457212</td>

</tr>

<tr>

<td height="17" align="center">getTrigger</td>

<td sdval="1158129094" sdnum="1033;" align="center">1158129094</td>

<td sdval="2273338312" sdnum="1033;" align="center">2273338312</td>

<td sdval="1189096068" sdnum="1033;" align="center">1189096068</td>

</tr>

<tr>

<td height="17" align="center">**Averages**</td>

<td sdval="993680174.333333" sdnum="1033;" align="center">993680174.333333</td>

<td sdval="3640900838.87037" sdnum="1033;" align="center">3640900838.87037</td>

<td sdval="1038003164.92593" sdnum="1033;" align="center">1038003164.92593</td>

</tr>

</tbody>

</table>
