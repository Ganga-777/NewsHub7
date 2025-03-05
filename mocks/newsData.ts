import { NewsItem, NewsCategory } from '@/types/news';

// Generate a unique ID
const generateId = (category: string, index: number) => `${category}-${index}-${Date.now()}`;

// Create mock news data for each category
export const generateMockNews = (category: NewsCategory): NewsItem[] => {
  const baseArticles: Record<NewsCategory, Array<{ title: string; snippet: string; imageUrl?: string }>> = {
    top: [
      {
        title: 'ఏపీలో ఎన్నికల ఫలితాలు: టీడీపీ-జనసేన కూటమికి భారీ విజయం',
        snippet: 'ఆంధ్రప్రదేశ్ అసెంబ్లీ ఎన్నికల్లో టీడీపీ-జనసేన కూటమి ఘన విజయం సాధించింది. 175 స్థానాల్లో 150కి పైగా స్థానాల్లో విజయం సాధించి ప్రభుత్వాన్ని ఏర్పాటు చేయనుంది.',
        imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dm90aW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'తెలంగాణలో వర్షాలు: హైదరాబాద్‌లో భారీ వర్షం',
        snippet: 'తెలంగాణలో భారీ వర్షాలు కురుస్తున్నాయి. హైదరాబాద్‌లో గత 24 గంటల్లో 10 సెంటీమీటర్ల వర్షపాతం నమోదైంది. పలు ప్రాంతాల్లో జలమయమైన రోడ్లు.',
        imageUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'భారత క్రికెట్ జట్టు విజయం: టీ20 సిరీస్‌లో శ్రీలంకపై గెలుపు',
        snippet: 'భారత క్రికెట్ జట్టు టీ20 సిరీస్‌లో శ్రీలంకపై 3-0తో క్లీన్ స్వీప్ చేసింది. చివరి మ్యాచ్‌లో 7 వికెట్ల తేడాతో గెలుపొందింది.',
        imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3JpY2tldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'పెట్రోల్, డీజిల్ ధరలు పెరిగాయి: హైదరాబాద్‌లో రూ.2 పెరుగుదల',
        snippet: 'పెట్రోల్, డీజిల్ ధరలు మరోసారి పెరిగాయి. హైదరాబాద్‌లో పెట్రోల్ లీటర్ రూ.2, డీజిల్ లీటర్ రూ.1.5 పెరిగాయి. ఇంధన ధరల పెరుగుదలతో ప్రజలు ఇబ్బందులు పడుతున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGV0cm9sfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      }
    ],
    politics: [
      {
        title: 'ప్రధాని మోదీ తెలంగాణ పర్యటన: హైదరాబాద్‌లో పలు ప్రాజెక్టుల ప్రారంభం',
        snippet: 'ప్రధాని నరేంద్ర మోదీ తెలంగాణ పర్యటనలో హైదరాబాద్‌లో పలు అభివృద్ధి ప్రాజెక్టులను ప్రారంభించారు. రూ.5000 కోట్ల విలువైన ప్రాజెక్టులకు శంకుస్థాపన చేశారు.',
        imageUrl: 'https://images.unsplash.com/photo-1575320181282-9afab399332c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGluZGlhbiUyMHBvbGl0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'రేవంత్ రెడ్డి సీఎం అభ్యర్థిగా ప్రకటన: కాంగ్రెస్ పార్టీ నిర్ణయం',
        snippet: 'తెలంగాణ కాంగ్రెస్ అధ్యక్షుడు రేవంత్ రెడ్డిని సీఎం అభ్యర్థిగా ప్రకటించింది కాంగ్రెస్ పార్టీ. రాబోయే ఎన్నికల్లో విజయం సాధిస్తే రేవంత్ రెడ్డి ముఖ్యమంత్రి అవుతారు.',
        imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cG9saXRpY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'ఏపీలో జగన్ సర్కార్‌కు వ్యతిరేకంగా టీడీపీ నిరసన: విశాఖలో ధర్నా',
        snippet: 'ఆంధ్రప్రదేశ్‌లో జగన్ సర్కార్‌కు వ్యతిరేకంగా టీడీపీ నిరసన చేపట్టింది. విశాఖపట్నంలో టీడీపీ నేతలు, కార్యకర్తలు ధర్నా నిర్వహించారు.',
        imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvdGVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      }
    ],
    business: [
      {
        title: 'హైదరాబాద్‌లో మరో ఐటీ కంపెనీ: 5000 మందికి ఉద్యోగాలు',
        snippet: 'హైదరాబాద్‌లో మరో ఐటీ కంపెనీ తన కార్యకలాపాలు ప్రారంభించింది. ఈ కంపెనీ ద్వారా 5000 మందికి ఉద్యోగాలు లభించనున్నాయి.',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ycG9yYXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'స్టాక్ మార్కెట్ రికార్డు స్థాయిలో: సెన్సెక్స్ 70,000 దాటింది',
        snippet: 'భారత స్టాక్ మార్కెట్ రికార్డు స్థాయికి చేరుకుంది. సెన్సెక్స్ తొలిసారిగా 70,000 పాయింట్లు దాటింది. నిఫ్టీ కూడా 21,000 పాయింట్లకు చేరువలో ఉంది.',
        imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'రిలయన్స్ కొత్త ప్రాజెక్ట్: తెలంగాణలో రూ.10,000 కోట్ల పెట్టుబడి',
        snippet: 'రిలయన్స్ ఇండస్ట్రీస్ తెలంగాణలో కొత్త ప్రాజెక్ట్ ప్రారంభించనుంది. ఈ ప్రాజెక్ట్‌లో రూ.10,000 కోట్లు పెట్టుబడి పెట్టనున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
      }
    ],
    technology: [
      {
        title: 'ఆపిల్ కొత్త ఐఫోన్ విడుదల: భారత్‌లో అమ్మకాలు ప్రారంభం',
        snippet: 'ఆపిల్ కొత్త ఐఫోన్ 15 సిరీస్ విడుదల చేసింది. భారత్‌లో ఈ కొత్త ఐఫోన్ అమ్మకాలు ప్రారంభమయ్యాయి. ధర రూ.79,900 నుంచి ప్రారంభం.',
        imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'స్పేస్ఎక్స్ మరో విజయం: 60 స్టార్‌లింక్ ఉపగ్రహాలు అంతరిక్షంలోకి',
        snippet: 'ఎలాన్ మస్క్ కంపెనీ స్పేస్ఎక్స్ మరో 60 స్టార్‌లింక్ ఉపగ్రహాలను అంతరిక్షంలోకి పంపింది. ఫాల్కన్ 9 రాకెట్ ద్వారా ఈ ఉపగ్రహాలు ప్రయోగించబడ్డాయి.',
        imageUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhY2V4fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'మైక్రోసాఫ్ట్ ఏఐ చాట్‌బాట్: తెలుగులో కూడా అందుబాటులోకి',
        snippet: 'మైక్రోసాఫ్ట్ తన ఏఐ చాట్‌బాట్ కోపిలట్‌ను తెలుగు భాషలో కూడా అందుబాటులోకి తెచ్చింది. ఇప్పుడు తెలుగులో ప్రశ్నలు అడిగి సమాధానాలు పొందవచ్చు.',
        imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBjaGF0Ym90fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      }
    ],
    entertainment: [
      {
        title: 'పుష్ప 2 ట్రైలర్ విడుదల: అల్లు అర్జున్ సినిమాపై భారీ అంచనాలు',
        snippet: 'అల్లు అర్జున్ నటించిన పుష్ప 2 సినిమా ట్రైలర్ విడుదలైంది. ఈ సినిమాపై భారీ అంచనాలు ఉన్నాయి. ఆగస్టు 15న సినిమా విడుదల కానుంది.',
        imageUrl: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWUlMjBwb3N0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'బిగ్ బాస్ తెలుగు 7వ సీజన్: ప్రారంభ తేదీ ప్రకటన',
        snippet: 'బిగ్ బాస్ తెలుగు 7వ సీజన్ ప్రారంభ తేదీ ప్రకటించారు. సెప్టెంబర్ 3 నుంచి ఈ సీజన్ ప్రారంభం కానుంది. నాగార్జున మళ్లీ హోస్ట్‌గా వ్యవహరించనున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHZ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'ఆస్కార్ అవార్డుకు భారత్ నుంచి ఎంపిక: ఆర్ఆర్ఆర్ సినిమా',
        snippet: 'ఆస్కార్ అవార్డుకు భారత్ నుంచి ఆర్ఆర్ఆర్ సినిమా ఎంపికైంది. ఈ సినిమాకు ఇప్పటికే గోల్డెన్ గ్లోబ్ అవార్డు లభించింది.',
        imageUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXdhcmRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      }
    ],
    sports: [
      {
        title: 'భారత క్రికెట్ జట్టు కొత్త కోచ్: గౌతమ్ గంభీర్ నియామకం',
        snippet: 'భారత క్రికెట్ జట్టుకు గౌతమ్ గంభీర్ కొత్త కోచ్‌గా నియమితులయ్యారు. రాహుల్ ద్రావిడ్ స్థానంలో గంభీర్ బాధ్యతలు చేపట్టనున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JpY2tldCUyMGNvYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'హైదరాబాద్ ఎఫ్‌సీ విజయం: ఐఎస్‌ఎల్‌లో చెన్నైయిన్ ఎఫ్‌సీపై గెలుపు',
        snippet: 'హైదరాబాద్ ఎఫ్‌సీ ఐఎస్‌ఎల్‌లో చెన్నైయిన్ ఎఫ్‌సీపై 2-0తో విజయం సాధించింది. ఈ విజయంతో హైదరాబాద్ ఎఫ్‌సీ పాయింట్ల పట్టికలో రెండో స్థానానికి చేరుకుంది.',
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29jY2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'పీవీ సింధు ఒలింపిక్స్‌కు సన్నద్ధం: ప్రత్యేక శిక్షణ ప్రారంభం',
        snippet: 'బ్యాడ్మింటన్ స్టార్ పీవీ సింధు పారిస్ ఒలింపిక్స్‌కు సన్నద్ధమవుతున్నారు. ప్రత్యేక శిక్షణ ప్రారంభించారు. మరో పతకం సాధించాలని లక్ష్యంగా పెట్టుకున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFkbWludG9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      }
    ],
    health: [
      {
        title: 'కొత్త కరోనా వేరియంట్: తెలంగాణలో అప్రమత్తం',
        snippet: 'కొత్త కరోనా వేరియంట్ వ్యాప్తి నేపథ్యంలో తెలంగాణ ప్రభుత్వం అప్రమత్తమైంది. ఆసుపత్రుల్లో ప్రత్యేక వార్డులు ఏర్పాటు చేశారు.',
        imageUrl: 'https://images.unsplash.com/photo-1584118624012-df056829fbd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29yb25hfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'డెంగ్యూ కేసులు పెరుగుదల: హైదరాబాద్‌లో అప్రమత్తత',
        snippet: 'హైదరాబాద్‌లో డెంగ్యూ కేసులు పెరుగుతున్నాయి. గత నెలతో పోలిస్తే 30% పెరిగాయి. ప్రజలు జాగ్రత్తలు తీసుకోవాలని వైద్యులు సూచిస్తున్నారు.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9zcXVpdG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'ఆయుష్మాన్ భారత్ పథకం విస్తరణ: మరిన్ని వైద్య సేవలు చేర్పు',
        snippet: 'ఆయుష్మాన్ భారత్ పథకంలో మరిన్ని వైద్య సేవలు చేర్చారు. కొత్తగా 20 రకాల శస్త్రచికిత్సలు పథకంలో చేర్చబడ్డాయి.',
        imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoJTIwaW5zdXJhbmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      }
    ],
    science: [
      {
        title: 'చంద్రయాన్-3 మిషన్ విజయం: చంద్రుడిపై భారత్ జెండా',
        snippet: 'చంద్రయాన్-3 మిషన్ విజయవంతంగా పూర్తయింది. చంద్రుడి దక్షిణ ధ్రువంపై భారత అంతరిక్ష పరిశోధనా సంస్థ (ఇస్రో) విక్రమ్ ల్యాండర్‌ను దించడంలో విజయం సాధించింది.',
        imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9vbiUyMGxhbmRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'ఇస్రో కొత్త ఉపగ్రహం ప్రయోగం: సముద్ర పర్యవేక్షణకు ఉపయోగపడనుంది',
        snippet: 'ఇస్రో కొత్త ఉపగ్రహాన్ని విజయవంతంగా ప్రయోగించింది. ఈ ఉపగ్రహం సముద్ర పర్యవేక్షణకు ఉపయోగపడనుంది. తుఫాన్ల ముందస్తు హెచ్చరికలు ఇవ్వడంలో సహాయపడుతుంది.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2F0ZWxsaXRlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'
      },
      {
        title: 'కొత్త జాతి చేపలు కనుగొన్న శాస్త్రవేత్తలు: గోదావరి నదిలో లభ్యం',
        snippet: 'శాస్త్రవేత్తలు గోదావరి నదిలో కొత్త జాతి చేపలను కనుగొన్నారు. ఈ చేపలకు స్థానిక శాస్త్రవేత్త పేరు పెట్టారు. ఈ చేపలు ప్రత్యేక లక్షణాలు కలిగి ఉన్నాయి.',
        imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaCUyMHNwZWNpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'
      }
    ]
  };

  // Get articles for the requested category
  const articles = baseArticles[category] || baseArticles.top;
  
  // Map to NewsItem format
  return articles.map((article, index) => ({
    id: generateId(category, index),
    title: article.title,
    link: 'https://example.com/news',
    source: 'తెలుగు వార్తలు',
    publishedDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    snippet: article.snippet,
    imageUrl: article.imageUrl,
    category
  }));
};