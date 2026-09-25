export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category:
    | 'World Geography'
    | 'Capitals & Countries'
    | 'Borders & Neighbors'
    | 'Continents & Oceans'
    | 'Straits, Seas & Canals'
    | 'Mountains & Rivers'
    | 'Geopolitical Regions'
    | 'International Organizations'
    | 'Strategic Locations'
    | 'Territorial Geography';
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
}

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // EASY DIFFICULTY (26 Questions)
  // ==========================================
  {
    id: 'e1',
    question: 'Which strait connects the Persian Gulf with the Gulf of Oman?',
    options: ['Bosporus Strait', 'Strait of Hormuz', 'Malacca Strait', 'Bering Strait'],
    correctIndex: 1,
    explanation: 'The Strait of Hormuz is a vital strategic waterway between the Persian Gulf and the Gulf of Oman through which about 20% of the world’s petroleum passes.',
    category: 'Straits, Seas & Canals',
    difficulty: 'easy'
  },
  {
    id: 'e2',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctIndex: 2,
    explanation: 'Canberra was chosen as the capital of Australia in 1908 as a compromise between rival major cities Sydney and Melbourne.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },
  {
    id: 'e3',
    question: 'Which artificial canal connects the Mediterranean Sea directly to the Red Sea?',
    options: ['Panama Canal', 'Suez Canal', 'Kiel Canal', 'Erie Canal'],
    correctIndex: 1,
    explanation: 'Opened in 1869, the Suez Canal in Egypt allows ships to travel directly between Europe and South Asia without circumnavigating Africa.',
    category: 'Straits, Seas & Canals',
    difficulty: 'easy'
  },
  {
    id: 'e4',
    question: 'Which is the largest ocean on Earth by surface area?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctIndex: 2,
    explanation: 'The Pacific Ocean is the world’s largest and deepest ocean, covering over 30% of the Earth’s total surface area.',
    category: 'Continents & Oceans',
    difficulty: 'easy'
  },
  {
    id: 'e5',
    question: 'Where is the headquarters of the United Nations (UN) located?',
    options: ['Geneva, Switzerland', 'New York City, USA', 'London, UK', 'Paris, France'],
    correctIndex: 1,
    explanation: 'The headquarters of the United Nations has been located in international territory in New York City since its completion in 1952.',
    category: 'International Organizations',
    difficulty: 'easy'
  },
  {
    id: 'e6',
    question: 'Which country has the longest total coastline in the world?',
    options: ['Russia', 'Australia', 'Canada', 'Indonesia'],
    correctIndex: 2,
    explanation: 'Canada possesses the world’s longest coastline, stretching over 202,080 kilometers (125,567 miles) across three oceans.',
    category: 'World Geography',
    difficulty: 'easy'
  },
  {
    id: 'e7',
    question: 'Which river is the longest in South America and has the largest drainage basin in the world?',
    options: ['Orinoco River', 'Paraná River', 'Amazon River', 'Magdalena River'],
    correctIndex: 2,
    explanation: 'The Amazon River in South America is the largest river by water discharge volume in the world and the longest river in the Western Hemisphere.',
    category: 'Mountains & Rivers',
    difficulty: 'easy'
  },
  {
    id: 'e8',
    question: 'What is the highest mountain range in the world, containing Mount Everest?',
    options: ['The Andes', 'The Alps', 'The Himalayas', 'The Rockies'],
    correctIndex: 2,
    explanation: 'The Himalayas spread across five Asian countries and contain the world’s highest peaks, including Mount Everest at 8,848.86 meters.',
    category: 'Mountains & Rivers',
    difficulty: 'easy'
  },
  {
    id: 'e9',
    question: 'Which country spans 11 time zones and is the largest country by land area in the world?',
    options: ['China', 'Canada', 'United States', 'Russia'],
    correctIndex: 3,
    explanation: 'Russia is the largest country by land mass, covering over 17 million square kilometers across Eastern Europe and Northern Asia.',
    category: 'Territorial Geography',
    difficulty: 'easy'
  },
  {
    id: 'e10',
    question: 'What is the capital city of Canada?',
    options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    correctIndex: 3,
    explanation: 'Ottawa, located in the province of Ontario near the Quebec border, was designated as the capital of Canada by Queen Victoria in 1857.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },
  {
    id: 'e11',
    question: 'Which intergovernmental military alliance is founded on the principle of collective defense under Article 5?',
    options: ['NATO', 'ASEAN', 'OAS', 'AU'],
    correctIndex: 0,
    explanation: 'The North Atlantic Treaty Organization (NATO) was established in 1949, pledging that an attack against one member is considered an attack against all.',
    category: 'International Organizations',
    difficulty: 'easy'
  },
  {
    id: 'e12',
    question: 'Which canal connects the Atlantic Ocean to the Pacific Ocean across Central America?',
    options: ['Suez Canal', 'Panama Canal', 'Kiel Canal', 'White Sea Canal'],
    correctIndex: 1,
    explanation: 'The Panama Canal is an 82-kilometer artificial waterway across the Isthmus of Panama that dramatically shortens maritime transit times between Atlantic and Pacific ports.',
    category: 'Strategic Locations',
    difficulty: 'easy'
  },
  {
    id: 'e13',
    question: 'What is the capital of Brazil?',
    options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
    correctIndex: 2,
    explanation: 'Brasília became the official capital of Brazil in 1960, replacing Rio de Janeiro to encourage inland development.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },
  {
    id: 'e14',
    question: 'Which body of water separates the British Isles from continental France?',
    options: ['North Sea', 'Irish Sea', 'English Channel', 'Baltic Sea'],
    correctIndex: 2,
    explanation: 'The English Channel (La Manche in French) connects the Atlantic Ocean to the North Sea and separates southern England from northern France.',
    category: 'Straits, Seas & Canals',
    difficulty: 'easy'
  },
  {
    id: 'e15',
    question: 'Which is the smallest continent by total land area?',
    options: ['Europe', 'Antarctica', 'Australia / Oceania', 'South America'],
    correctIndex: 2,
    explanation: 'Australia (often categorized with Oceania) is the smallest continent by land area, occupying roughly 7.7 million square kilometers.',
    category: 'Continents & Oceans',
    difficulty: 'easy'
  },
  {
    id: 'e16',
    question: 'Which two countries share the longest international land border in the world?',
    options: ['Russia and China', 'United States and Canada', 'Brazil and Argentina', 'India and Bangladesh'],
    correctIndex: 1,
    explanation: 'The border between Canada and the United States stretches 8,891 kilometers (5,525 miles), making it the longest land border between two nations.',
    category: 'Borders & Neighbors',
    difficulty: 'easy'
  },
  {
    id: 'e17',
    question: 'Where is the administrative seat and headquarters of the European Union primary institutions located?',
    options: ['Geneva, Switzerland', 'Brussels, Belgium', 'Berlin, Germany', 'Vienna, Austria'],
    correctIndex: 1,
    explanation: 'Brussels serves as the de facto capital of the European Union, hosting the main seats of the European Commission, European Council, and Council of the EU.',
    category: 'International Organizations',
    difficulty: 'easy'
  },
  {
    id: 'e18',
    question: 'Which continent has no permanent human population or sovereign nations?',
    options: ['Antarctica', 'Australia', 'Arctic', 'Oceania'],
    correctIndex: 0,
    explanation: 'Antarctica is governed by the Antarctic Treaty System and is reserved exclusively for peaceful scientific research with no permanent native population.',
    category: 'Continents & Oceans',
    difficulty: 'easy'
  },
  {
    id: 'e19',
    question: 'What is the capital city of Japan?',
    options: ['Kyoto', 'Osaka', 'Tokyo', 'Yokohama'],
    correctIndex: 2,
    explanation: 'Tokyo has been the official capital of Japan since 1868, when the Emperor moved his residence there from Kyoto.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },
  {
    id: 'e20',
    question: 'Gibraltar is a British Overseas Territory located at the southern tip of which peninsula?',
    options: ['Balkan Peninsula', 'Iberian Peninsula', 'Italian Peninsula', 'Scandinavian Peninsula'],
    correctIndex: 1,
    explanation: 'Gibraltar guards the narrow entrance to the Mediterranean Sea from the Atlantic Ocean at the southern edge of the Iberian Peninsula.',
    category: 'Strategic Locations',
    difficulty: 'easy'
  },
  {
    id: 'e21',
    question: 'Which major river flows north through East Africa and Egypt into the Mediterranean Sea?',
    options: ['Congo River', 'Niger River', 'Nile River', 'Zambezi River'],
    correctIndex: 2,
    explanation: 'The Nile River flows northbound over 6,600 km through 11 countries in northeastern Africa before discharging into the Mediterranean Sea.',
    category: 'Mountains & Rivers',
    difficulty: 'easy'
  },
  {
    id: 'e22',
    question: 'Which landlocked South American country has two constitutional or administrative capitals (La Paz and Sucre)?',
    options: ['Paraguay', 'Bolivia', 'Uruguay', 'Ecuador'],
    correctIndex: 1,
    explanation: 'Bolivia has two capitals: Sucre is the constitutional and judicial capital, while La Paz is the executive and legislative seat of government.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },
  {
    id: 'e23',
    question: 'Which regional intergovernmental organization comprises 10 Southeast Asian nations?',
    options: ['APEC', 'ASEAN', 'SAARC', 'SCO'],
    correctIndex: 1,
    explanation: 'The Association of Southeast Asian Nations (ASEAN) was formed in 1967 to promote economic growth, regional peace, and stability in Southeast Asia.',
    category: 'International Organizations',
    difficulty: 'easy'
  },
  {
    id: 'e24',
    question: 'Which sea separates Italy from the Balkan Peninsula?',
    options: ['Tyrrhenian Sea', 'Ionian Sea', 'Adriatic Sea', 'Aegean Sea'],
    correctIndex: 2,
    explanation: 'The Adriatic Sea is a body of water separating the Italian Peninsula from the Balkan Peninsula.',
    category: 'Geopolitical Regions',
    difficulty: 'easy'
  },
  {
    id: 'e25',
    question: 'Which nation is known geographically as an archipelago of over 17,000 islands in Southeast Asia?',
    options: ['Philippines', 'Indonesia', 'Japan', 'Malaysia'],
    correctIndex: 1,
    explanation: 'Indonesia is the largest archipelagic state in the world, consisting of more than 17,000 islands straddling the equator.',
    category: 'Territorial Geography',
    difficulty: 'easy'
  },
  {
    id: 'e26',
    question: 'What is the capital city of South Korea?',
    options: ['Busan', 'Seoul', 'Incheon', 'Pyongyang'],
    correctIndex: 1,
    explanation: 'Seoul is the capital and largest metropolis of the Republic of Korea (South Korea), housing nearly half of the country’s population in its metro area.',
    category: 'Capitals & Countries',
    difficulty: 'easy'
  },

  // ==========================================
  // MEDIUM DIFFICULTY (26 Questions)
  // ==========================================
  {
    id: 'm1',
    question: 'Which strategic strait between Sumatra and the Malay Peninsula carries roughly 25% of all global maritime trade?',
    options: ['Strait of Malacca', 'Sund Strait', 'Lombok Strait', 'Strait of Hormuz'],
    correctIndex: 0,
    explanation: 'The Strait of Malacca is one of the world’s most vital maritime choke points, connecting the Indian Ocean to the South China Sea.',
    category: 'Strategic Locations',
    difficulty: 'medium'
  },
  {
    id: 'm2',
    question: 'Which country shares land borders with 14 other nations, tying with China for the highest number of border neighbors?',
    options: ['India', 'Brazil', 'Russia', 'Germany'],
    correctIndex: 2,
    explanation: 'Russia and China both share land borders with 14 sovereign countries, more than any other nations on Earth.',
    category: 'Borders & Neighbors',
    difficulty: 'medium'
  },
  {
    id: 'm3',
    question: 'The Bab-el-Mandeb Strait acts as a strategic choke point connecting the Red Sea to which body of water?',
    options: ['Persian Gulf', 'Gulf of Aden', 'Arabian Sea', 'Mozambique Channel'],
    correctIndex: 1,
    explanation: 'The Bab-el-Mandeb Strait ("Gate of Tears") connects the Red Sea to the Gulf of Aden and the Indian Ocean between Yemen and Djibouti/Eritrea.',
    category: 'Straits, Seas & Canals',
    difficulty: 'medium'
  },
  {
    id: 'm4',
    question: 'Which African country officially joined the BRIC grouping in 2010, turning the acronym into BRICS?',
    options: ['Nigeria', 'Egypt', 'South Africa', 'Kenya'],
    correctIndex: 2,
    explanation: 'South Africa joined Brazil, Russia, India, and China in December 2010 to form the expanded BRICS bloc.',
    category: 'International Organizations',
    difficulty: 'medium'
  },
  {
    id: 'm5',
    question: 'Which major European river originates in Germany’s Black Forest and flows east through 10 countries into the Black Sea?',
    options: ['Rhine River', 'Danube River', 'Elbe River', 'Volga River'],
    correctIndex: 1,
    explanation: 'The Danube is Europe’s second-longest river and passes through or forms the borders of Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova, and Ukraine.',
    category: 'Mountains & Rivers',
    difficulty: 'medium'
  },
  {
    id: 'm6',
    question: 'What is the capital city of Kazakhstan, which was briefly renamed Nur-Sultan from 2019 to 2022?',
    options: ['Almaty', 'Astana', 'Tashkent', 'Bishkek'],
    correctIndex: 1,
    explanation: 'The capital of Kazakhstan was renamed from Astana to Nur-Sultan in 2019, before being officially renamed back to Astana in September 2022.',
    category: 'Capitals & Countries',
    difficulty: 'medium'
  },
  {
    id: 'm7',
    question: 'Which country controls the Kaliningrad exclave, situated on the Baltic coast between Poland and Lithuania?',
    options: ['Germany', 'Belarus', 'Russia', 'Poland'],
    correctIndex: 2,
    explanation: 'Kaliningrad is an exclave of the Russian Federation, separated from mainland Russia and surrounded by EU/NATO members Poland and Lithuania.',
    category: 'Territorial Geography',
    difficulty: 'medium'
  },
  {
    id: 'm8',
    question: 'What collective term refers to the three north-European nations of Estonia, Latvia, and Lithuania?',
    options: ['Nordic Countries', 'Baltic States', 'Benelux', 'Balkan States'],
    correctIndex: 1,
    explanation: 'The Baltic States comprise Estonia, Latvia, and Lithuania, situated on the eastern coast of the Baltic Sea.',
    category: 'Geopolitical Regions',
    difficulty: 'medium'
  },
  {
    id: 'm9',
    question: 'Which mountain range traditionally forms the geographic border separating Europe from Asia in Russia?',
    options: ['Caucasus Mountains', 'Ural Mountains', 'Carpathian Mountains', 'Altai Mountains'],
    correctIndex: 1,
    explanation: 'The Ural Mountains run north-to-south through western Russia and are universally recognized as part of the natural boundary between Europe and Asia.',
    category: 'Mountains & Rivers',
    difficulty: 'medium'
  },
  {
    id: 'm10',
    question: 'Which European microstate is doubly landlocked, bordered exclusively by Switzerland and Austria?',
    options: ['Andorra', 'San Marino', 'Liechtenstein', 'Monaco'],
    correctIndex: 2,
    explanation: 'Liechtenstein is one of only two doubly landlocked countries in the world (along with Uzbekistan), meaning it is surrounded entirely by landlocked nations.',
    category: 'Borders & Neighbors',
    difficulty: 'medium'
  },
  {
    id: 'm11',
    question: 'The Suwalki Gap is a narrow corridor of land crucial to NATO defense that links Poland to which country?',
    options: ['Lithuania', 'Latvia', 'Ukraine', 'Estonia'],
    correctIndex: 0,
    explanation: 'The Suwalki Gap is a 65 km land border between Poland and Lithuania, sandwiched between the Russian exclave of Kaliningrad and Belarus.',
    category: 'Strategic Locations',
    difficulty: 'medium'
  },
  {
    id: 'm12',
    question: 'Which is the largest island in the world that is not considered a continent of its own?',
    options: ['Madagascar', 'Borneo', 'Greenland', 'New Guinea'],
    correctIndex: 2,
    explanation: 'Greenland covers 2,166,086 square kilometers, making it the world’s largest island, and is an autonomous territory within the Kingdom of Denmark.',
    category: 'World Geography',
    difficulty: 'medium'
  },
  {
    id: 'm13',
    question: 'What is the capital city of Turkey?',
    options: ['Istanbul', 'Ankara', 'Izmir', 'Antalya'],
    correctIndex: 1,
    explanation: 'Ankara became the capital of Turkey in 1923 following the fall of the Ottoman Empire, replacing Istanbul.',
    category: 'Capitals & Countries',
    difficulty: 'medium'
  },
  {
    id: 'm14',
    question: 'Which body of water is technically the world’s largest inland lake by area, despite being called a "sea"?',
    options: ['Black Sea', 'Caspian Sea', 'Aral Sea', 'Dead Sea'],
    correctIndex: 1,
    explanation: 'The Caspian Sea is an endorheic basin bounded by Russia, Kazakhstan, Turkmenistan, Iran, and Azerbaijan, making it the largest lake on Earth.',
    category: 'Straits, Seas & Canals',
    difficulty: 'medium'
  },
  {
    id: 'm15',
    question: 'Where is the principal judicial organ of the UN, the International Court of Justice (ICJ), headquartered?',
    options: ['Geneva, Switzerland', 'The Hague, Netherlands', 'Vienna, Austria', 'Brussels, Belgium'],
    correctIndex: 1,
    explanation: 'The ICJ is headquartered at the Peace Palace in The Hague, Netherlands, making it the only principal UN organ not located in New York.',
    category: 'International Organizations',
    difficulty: 'medium'
  },
  {
    id: 'm16',
    question: 'Which country occupies the southern portion of the Jutland Peninsula in Northern Europe?',
    options: ['Denmark', 'Germany', 'Sweden', 'Netherlands'],
    correctIndex: 1,
    explanation: 'The Jutland Peninsula extends northwards; its northern region forms main Denmark, while its southern area forms the German state of Schleswig-Holstein.',
    category: 'Territorial Geography',
    difficulty: 'medium'
  },
  {
    id: 'm17',
    question: 'Which geopolitical subregion of East Africa includes Somalia, Ethiopia, Eritrea, and Djibouti?',
    options: ['The Maghreb', 'Horn of Africa', 'The Sahel', 'Great Lakes Region'],
    correctIndex: 1,
    explanation: 'The Horn of Africa is a strategic peninsula in East Africa lying along the southern side of the Gulf of Aden and the Red Sea.',
    category: 'Geopolitical Regions',
    difficulty: 'medium'
  },
  {
    id: 'm18',
    question: 'Which river forms a major part of the international border between the United States and Mexico?',
    options: ['Colorado River', 'Rio Grande', 'Mississippi River', 'Columbia River'],
    correctIndex: 1,
    explanation: 'The Rio Grande (known in Mexico as the Río Bravo del Norte) forms 2,019 kilometers of the border between the US state of Texas and Mexico.',
    category: 'Borders & Neighbors',
    difficulty: 'medium'
  },
  {
    id: 'm19',
    question: 'Which narrow body of water separates Taiwan from mainland China?',
    options: ['Luzon Strait', 'Taiwan Strait', 'Tsushima Strait', 'Malacca Strait'],
    correctIndex: 1,
    explanation: 'The Taiwan Strait (or Formosa Strait) is a 180-kilometer-wide body of water connecting the East China Sea and South China Sea.',
    category: 'Straits, Seas & Canals',
    difficulty: 'medium'
  },
  {
    id: 'm20',
    question: 'Diego Garcia is a strategically important military base located in an atoll in which ocean?',
    options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean'],
    correctIndex: 2,
    explanation: 'Diego Garcia is an atoll in the Chagos Archipelago in the central Indian Ocean, leased by the UK for joint US military operations.',
    category: 'Strategic Locations',
    difficulty: 'medium'
  },
  {
    id: 'm21',
    question: 'The Mekong River originates in the Tibetan Plateau and empties into which sea via a vast delta in Vietnam?',
    options: ['East China Sea', 'South China Sea', 'Andaman Sea', 'Philippine Sea'],
    correctIndex: 1,
    explanation: 'The Mekong River flows over 4,900 km through China, Myanmar, Laos, Thailand, Cambodia, and Vietnam into the South China Sea.',
    category: 'Mountains & Rivers',
    difficulty: 'medium'
  },
  {
    id: 'm22',
    question: 'What is the capital city of Nigeria, which replaced Lagos in 1991?',
    options: ['Lagos', 'Kano', 'Abuja', 'Ibadan'],
    correctIndex: 2,
    explanation: 'Abuja was built as a planned city in the 1980s and officially replaced Lagos as Nigeria’s federal capital in 1991 due to its central geographic location.',
    category: 'Capitals & Countries',
    difficulty: 'medium'
  },
  {
    id: 'm23',
    question: 'How many permanent, veto-wielding members (P5) sit on the United Nations Security Council?',
    options: ['5', '7', '10', '15'],
    correctIndex: 0,
    explanation: 'The P5 permanent members are China, France, Russia, the United Kingdom, and the United States.',
    category: 'International Organizations',
    difficulty: 'medium'
  },
  {
    id: 'm24',
    question: 'What is the highest commercially navigable lake in the world, situated on the border of Peru and Bolivia?',
    options: ['Lake Victoria', 'Lake Baikal', 'Lake Titicaca', 'Lake Malawi'],
    correctIndex: 2,
    explanation: 'Lake Titicaca sits in the Andes Mountains at an altitude of 3,812 meters (12,507 feet) above sea level.',
    category: 'World Geography',
    difficulty: 'medium'
  },
  {
    id: 'm25',
    question: 'The Canary Islands, located off the northwestern coast of Africa, are an autonomous community of which European nation?',
    options: ['Portugal', 'France', 'Spain', 'United Kingdom'],
    correctIndex: 2,
    explanation: 'The Canary Islands are a Spanish archipelago situated in the Atlantic Ocean, 100 kilometers west of Morocco.',
    category: 'Territorial Geography',
    difficulty: 'medium'
  },
  {
    id: 'm26',
    question: 'What is the capital city of Vietnam?',
    options: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Haiphong'],
    correctIndex: 1,
    explanation: 'Hanoi is the historic capital city of Vietnam, while Ho Chi Minh City (formerly Saigon) is the largest economic metropolis.',
    category: 'Capitals & Countries',
    difficulty: 'medium'
  },

  // ==========================================
  // HARD DIFFICULTY (26 Questions)
  // ==========================================
  {
    id: 'h1',
    question: 'The Bosporus and Dardanelles straits in Turkey connect the Black Sea to which major sea?',
    options: ['Red Sea', 'Caspian Sea', 'Aegean Sea', 'Adriatic Sea'],
    correctIndex: 2,
    explanation: 'Together with the Sea of Marmara, the Bosporus and Dardanelles straits form the Turkish Straits connecting the Black Sea to the Aegean (and Mediterranean) Sea.',
    category: 'Straits, Seas & Canals',
    difficulty: 'hard'
  },
  {
    id: 'h2',
    question: 'Which sovereign state is entirely surrounded by South Africa as an enclave nation?',
    options: ['Eswatini', 'Lesotho', 'Botswana', 'Malawi'],
    correctIndex: 1,
    explanation: 'The Kingdom of Lesotho is an enclaved country completely surrounded by the territory of South Africa.',
    category: 'Borders & Neighbors',
    difficulty: 'hard'
  },
  {
    id: 'h3',
    question: 'The controversial "Nine-Dash Line" refers to sweeping maritime and territorial claims in which body of water?',
    options: ['East China Sea', 'South China Sea', 'Yellow Sea', 'Sea of Japan'],
    correctIndex: 1,
    explanation: 'The Nine-Dash Line (now expanded in some maps) represents historic claims asserted by China over nearly 90% of the South China Sea.',
    category: 'Geopolitical Regions',
    difficulty: 'hard'
  },
  {
    id: 'h4',
    question: 'In which European capital is OPEC (Organization of the Petroleum Exporting Countries) headquartered, despite the country not being a member?',
    options: ['Geneva, Switzerland', 'Vienna, Austria', 'Brussels, Belgium', 'Zurich, Switzerland'],
    correctIndex: 1,
    explanation: 'OPEC was founded in Baghdad in 1960 and relocated its headquarters to Vienna, Austria in 1965 due to Austria’s diplomatic neutrality.',
    category: 'International Organizations',
    difficulty: 'hard'
  },
  {
    id: 'h5',
    question: 'What is the official capital city of Myanmar, which replaced Yangon in 2005?',
    options: ['Mandalay', 'Yangon', 'Naypyidaw', 'Bago'],
    correctIndex: 2,
    explanation: 'Naypyidaw was officially declared the national capital of Myanmar in November 2005 after being constructed as a planned inland administrative city.',
    category: 'Capitals & Countries',
    difficulty: 'hard'
  },
  {
    id: 'h6',
    question: 'The Dnieper River flows through Russia, Belarus, and Ukraine before emptying into which body of water?',
    options: ['Baltic Sea', 'Black Sea', 'Caspian Sea', 'Sea of Azov'],
    correctIndex: 1,
    explanation: 'The Dnieper River is one of Europe’s major rivers, flowing 2,200 km southward through Ukraine to empty into the Black Sea.',
    category: 'Mountains & Rivers',
    difficulty: 'hard'
  },
  {
    id: 'h7',
    question: 'Which autonomous Portuguese archipelago in the North Atlantic lies roughly 1,400 km west of mainland Lisbon?',
    options: ['Madeira', 'The Azores', 'Canary Islands', 'Cape Verde'],
    correctIndex: 1,
    explanation: 'The Azores consist of nine volcanic islands in the mid-Atlantic that constitute an autonomous region of Portugal.',
    category: 'Territorial Geography',
    difficulty: 'hard'
  },
  {
    id: 'h8',
    question: 'The Caucasus Mountains lie directly between which two major bodies of water?',
    options: ['Black Sea and Caspian Sea', 'Mediterranean Sea and Black Sea', 'Caspian Sea and Aral Sea', 'Red Sea and Persian Gulf'],
    correctIndex: 0,
    explanation: 'The Caucasus Mountains form a high mountain barrier between the Black Sea to the west and the Caspian Sea to the east.',
    category: 'Mountains & Rivers',
    difficulty: 'hard'
  },
  {
    id: 'h9',
    question: 'The Kerch Strait connects the Black Sea to which shallow body of water?',
    options: ['Sea of Marmara', 'Sea of Azov', 'Aegean Sea', 'Ionian Sea'],
    correctIndex: 1,
    explanation: 'The Kerch Strait separates the Crimean Peninsula from Russia’s Taman Peninsula and links the Black Sea with the Sea of Azov.',
    category: 'Strategic Locations',
    difficulty: 'hard'
  },
  {
    id: 'h10',
    question: 'Which country shares a land border with BOTH North Korea and Norway?',
    options: ['China', 'Finland', 'Russia', 'Sweden'],
    correctIndex: 2,
    explanation: 'Russia borders Norway in the far northwest (196 km border) and North Korea in the far southeast (17.3 km border).',
    category: 'Borders & Neighbors',
    difficulty: 'hard'
  },
  {
    id: 'h11',
    question: 'What is the deepest freshwater lake in the world, holding approximately 20% of Earth’s unfrozen surface freshwater?',
    options: ['Lake Superior', 'Lake Tanganyika', 'Lake Baikal', 'Lake Huron'],
    correctIndex: 2,
    explanation: 'Lake Baikal in southern Siberia, Russia, reaches a depth of 1,642 meters (5,387 feet) and is the oldest and deepest lake on Earth.',
    category: 'World Geography',
    difficulty: 'hard'
  },
  {
    id: 'h12',
    question: 'The Maghreb is a geopolitical subregion comprising the western part of which region?',
    options: ['The Middle East', 'North Africa', 'Central Asia', 'West Africa'],
    correctIndex: 1,
    explanation: 'The Maghreb includes Morocco, Algeria, Tunisia, Libya, and Mauritania in western North Africa.',
    category: 'Geopolitical Regions',
    difficulty: 'hard'
  },
  {
    id: 'h13',
    question: 'What is the official capital city of Ecuador, situated at an elevation of 2,850 meters in the Andes?',
    options: ['Guayaquil', 'Quito', 'Cuenca', 'Cali'],
    correctIndex: 1,
    explanation: 'Quito is the capital of Ecuador and the second-highest official capital city in the world after La Paz, Bolivia.',
    category: 'Capitals & Countries',
    difficulty: 'hard'
  },
  {
    id: 'h14',
    question: 'In which capital city is the main headquarters of the African Union (AU) located?',
    options: ['Nairobi, Kenya', 'Johannesburg, South Africa', 'Addis Ababa, Ethiopia', 'Cairo, Egypt'],
    correctIndex: 2,
    explanation: 'The African Union headquarters was established in Addis Ababa, Ethiopia, which also previously hosted the Organization of African Unity (OAU).',
    category: 'International Organizations',
    difficulty: 'hard'
  },
  {
    id: 'h15',
    question: 'Which strait separates the island of Sicily from the North African coast of Tunisia?',
    options: ['Strait of Messina', 'Strait of Sicily', 'Strait of Bonifacio', 'Strait of Otranto'],
    correctIndex: 1,
    explanation: 'The Strait of Sicily (Channel of Sicily) is a narrow marine passage approximately 145 km wide between Sicily and Tunisia.',
    category: 'Straits, Seas & Canals',
    difficulty: 'hard'
  },
  {
    id: 'h16',
    question: 'Cabinda is an oil-rich exclave belonging to which nation, separated by a strip of territory belonging to the Democratic Republic of the Congo?',
    options: ['Republic of the Congo', 'Gabon', 'Angola', 'Equatorial Guinea'],
    correctIndex: 2,
    explanation: 'Cabinda is a provincial exclave of Angola separated from the rest of the country by the DRC’s narrow access to the Atlantic Ocean.',
    category: 'Territorial Geography',
    difficulty: 'hard'
  },
  {
    id: 'h17',
    question: 'The Indus River originates in the Tibetan Plateau and flows primarily through which nation before entering the Arabian Sea?',
    options: ['India', 'Pakistan', 'Bangladesh', 'Afghanistan'],
    correctIndex: 1,
    explanation: 'The Indus River flows 3,180 km through northern India and down the length of Pakistan, acting as Pakistan’s primary water lifeline.',
    category: 'Mountains & Rivers',
    difficulty: 'hard'
  },
  {
    id: 'h18',
    question: 'Which body of water forms the natural western border of Jordan and the eastern border of the West Bank?',
    options: ['Gulf of Aqaba', 'Dead Sea', 'Red Sea', 'Sea of Galilee'],
    correctIndex: 1,
    explanation: 'The Dead Sea and the Jordan River form the boundary separating Jordan to the east from the West Bank and Israel to the west.',
    category: 'Borders & Neighbors',
    difficulty: 'hard'
  },
  {
    id: 'h19',
    question: 'What is the capital city of Morocco?',
    options: ['Casablanca', 'Marrakesh', 'Rabat', 'Fes'],
    correctIndex: 2,
    explanation: 'Rabat is the political capital of Morocco, located on the Atlantic coast, while Casablanca is its largest commercial city.',
    category: 'Capitals & Countries',
    difficulty: 'hard'
  },
  {
    id: 'h20',
    question: 'What is the subregional name for the Pacific island grouping that includes Fiji, Vanuatu, the Solomon Islands, and Papua New Guinea?',
    options: ['Polynesia', 'Micronesia', 'Melanesia', 'Australasia'],
    correctIndex: 2,
    explanation: 'Melanesia is a subregion of Oceania extending from New Guinea island southeastward to the Arafura Sea and Fiji.',
    category: 'Geopolitical Regions',
    difficulty: 'hard'
  },
  {
    id: 'h21',
    question: 'Which international treaty signed in Washington in 1959 declared that an entire continent be reserved exclusively for peaceful scientific purposes?',
    options: ['Outer Space Treaty', 'Antarctic Treaty', 'Kyoto Protocol', 'Law of the Sea Treaty'],
    correctIndex: 1,
    explanation: 'The Antarctic Treaty banned military activity, weapon testing, and nuclear waste disposal across Antarctica while freezing territorial claims.',
    category: 'International Organizations',
    difficulty: 'hard'
  },
  {
    id: 'h22',
    question: 'The Bering Strait separates Russia’s Chukotka Peninsula from which US state?',
    options: ['Washington', 'Alaska', 'Hawaii', 'Oregon'],
    correctIndex: 1,
    explanation: 'The Bering Strait is approximately 82 kilometers wide at its narrowest point between Cape Dezhnev (Russia) and Cape Prince of Wales (Alaska).',
    category: 'Straits, Seas & Canals',
    difficulty: 'hard'
  },
  {
    id: 'h23',
    question: 'Which mountain range forms the natural geographic border separating France and Spain?',
    options: ['The Alps', 'The Pyrenees', 'The Apennines', 'The Carpathians'],
    correctIndex: 1,
    explanation: 'The Pyrenees range forms a continuous high wall between Southwestern Europe’s Iberian Peninsula and the rest of continental France.',
    category: 'Mountains & Rivers',
    difficulty: 'hard'
  },
  {
    id: 'h24',
    question: 'Which South American nation is the only one bordering both the Pacific Ocean and the Caribbean Sea?',
    options: ['Panama', 'Colombia', 'Venezuela', 'Ecuador'],
    correctIndex: 1,
    explanation: 'Colombia has coastlines along both the Pacific Ocean to the west and the Caribbean Sea to the north.',
    category: 'Territorial Geography',
    difficulty: 'hard'
  },
  {
    id: 'h25',
    question: 'Which country in Central America has no standing army, having constitutionalized its military abolition in 1949?',
    options: ['Panama', 'Costa Rica', 'Nicaragua', 'Belize'],
    correctIndex: 1,
    explanation: 'Costa Rica constitutionally abolished its military forces in 1949, reallocating defense spending into education and environmental protection.',
    category: 'Geopolitical Regions',
    difficulty: 'hard'
  },
  {
    id: 'h26',
    question: 'What is the capital city of Kenya?',
    options: ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'],
    correctIndex: 1,
    explanation: 'Nairobi is the capital and largest city of Kenya, serving as a major financial and political center in East Africa.',
    category: 'Capitals & Countries',
    difficulty: 'hard'
  },

  // ==========================================
  // VERY HARD DIFFICULTY (26 Questions)
  // ==========================================
  {
    id: 'vh1',
    question: 'The Gulf of Aqaba grants Jordan its only maritime outlet and container port at which strategic coastal city?',
    options: ['Amman', 'Aqaba', 'Eilat', 'Jeddah'],
    correctIndex: 1,
    explanation: 'Aqaba is Jordan’s only coastal city and seaport, giving the otherwise landlocked-oriented nation access to the Red Sea via the Gulf of Aqaba.',
    category: 'Strategic Locations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh2',
    question: 'The Fergana Valley, a densely populated agricultural zone with complex geopolitical enclaves, is split among which three Central Asian states?',
    options: ['Kazakhstan, Uzbekistan, Turkmenistan', 'Uzbekistan, Kyrgyzstan, Tajikistan', 'Tajikistan, Afghanistan, Uzbekistan', 'Kyrgyzstan, Kazakhstan, Tajikistan'],
    correctIndex: 1,
    explanation: 'The Fergana Valley was partitioned by Soviet border drawing, creating intricate enclaves shared among Uzbekistan, Kyrgyzstan, and Tajikistan.',
    category: 'Geopolitical Regions',
    difficulty: 'very_hard'
  },
  {
    id: 'vh3',
    question: 'Where is the permanent Secretariat and administrative headquarters of the Shanghai Cooperation Organisation (SCO) situated?',
    options: ['Moscow, Russia', 'Beijing, China', 'Astana, Kazakhstan', 'Tashkent, Uzbekistan'],
    correctIndex: 1,
    explanation: 'The Shanghai Cooperation Organisation (SCO) maintains its primary administrative Secretariat in Beijing, China.',
    category: 'International Organizations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh4',
    question: 'Svalbard is an Arctic archipelago governed under a unique 1920 treaty that grants equal commercial rights to signatory nations under the sovereignty of which country?',
    options: ['Denmark', 'Norway', 'Russia', 'Iceland'],
    correctIndex: 1,
    explanation: 'The Svalbard Treaty recognized Norwegian sovereignty over Svalbard while establishing a demilitarized zone and granting equal economic rights to all signatories.',
    category: 'Territorial Geography',
    difficulty: 'very_hard'
  },
  {
    id: 'vh5',
    question: 'Which strategic Indonesian strait between Java and Sumatra connects the Java Sea to the Indian Ocean?',
    options: ['Strait of Malacca', 'Sunda Strait', 'Lombok Strait', 'Makassar Strait'],
    correctIndex: 1,
    explanation: 'The Sunda Strait lies between Java and Sumatra and contains the famous volcanic island of Krakatoa.',
    category: 'Straits, Seas & Canals',
    difficulty: 'very_hard'
  },
  {
    id: 'vh6',
    question: 'South Africa has three official capital cities. Which city serves specifically as the executive and administrative seat of government?',
    options: ['Cape Town', 'Johannesburg', 'Pretoria', 'Bloemfontein'],
    correctIndex: 2,
    explanation: 'Pretoria is the executive capital, Cape Town is the legislative capital, and Bloemfontein is the judicial capital of South Africa.',
    category: 'Capitals & Countries',
    difficulty: 'very_hard'
  },
  {
    id: 'vh7',
    question: 'The Amur River forms a long natural boundary stretching over 1,800 km between which two major world powers?',
    options: ['China and Russia', 'Russia and Mongolia', 'China and North Korea', 'India and China'],
    correctIndex: 0,
    explanation: 'The Amur River (Heilong Jiang in Chinese) forms the border between the Russian Far East and Northeastern China.',
    category: 'Borders & Neighbors',
    difficulty: 'very_hard'
  },
  {
    id: 'vh8',
    question: 'Besides Liechtenstein, which central Asian republic is the only other "doubly landlocked" country in the world?',
    options: ['Afghanistan', 'Mongolia', 'Uzbekistan', 'Kyrgyzstan'],
    correctIndex: 2,
    explanation: 'Uzbekistan is surrounded exclusively by five landlocked nations: Afghanistan, Kazakhstan, Kyrgyzstan, Tajikistan, and Turkmenistan.',
    category: 'Borders & Neighbors',
    difficulty: 'very_hard'
  },
  {
    id: 'vh9',
    question: 'Where is the headquarters of the International Atomic Energy Agency (IAEA) located?',
    options: ['Geneva, Switzerland', 'Vienna, Austria', 'The Hague, Netherlands', 'Paris, France'],
    correctIndex: 1,
    explanation: 'The IAEA, an autonomous intergovernmental organization fostering peaceful nuclear energy use, is located at the Vienna International Centre in Austria.',
    category: 'International Organizations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh10',
    question: 'Mount Elbrus, the highest peak in Europe at 5,642 meters, is situated in which mountain range?',
    options: ['Alps', 'Ural Mountains', 'Caucasus Mountains', 'Carpathian Mountains'],
    correctIndex: 2,
    explanation: 'Mount Elbrus is a dormant volcano in the Caucasus Mountains in Southern Russia, recognized as the highest mountain in continental Europe.',
    category: 'Mountains & Rivers',
    difficulty: 'very_hard'
  },
  {
    id: 'vh11',
    question: 'The Socotra Archipelago, renowned for its unique endemic species such as the Dragon Blood Tree, is under the sovereignty of which nation?',
    options: ['Somalia', 'Yemen', 'Oman', 'Eritrea'],
    correctIndex: 1,
    explanation: 'Socotra lies in the Arabian Sea near the Horn of Africa and is politically part of the Republic of Yemen.',
    category: 'Territorial Geography',
    difficulty: 'very_hard'
  },
  {
    id: 'vh12',
    question: 'Which body of water connects the Baltic Sea to the North Sea through the Kattegat and Skagerrak straits?',
    options: ['Danish Straits', 'Bosporus', 'English Channel', 'Bothnian Bay'],
    correctIndex: 0,
    explanation: 'The Danish Straits (Øresund, Great Belt, and Little Belt) link the Baltic Sea to the North Sea via the Kattegat and Skagerrak.',
    category: 'Straits, Seas & Canals',
    difficulty: 'very_hard'
  },
  {
    id: 'vh13',
    question: 'What is the administrative and official capital of Sri Lanka (replacing Colombo for legislative business)?',
    options: ['Colombo', 'Sri Jayawardenepura Kotte', 'Kandy', 'Galle'],
    correctIndex: 1,
    explanation: 'Sri Jayawardenepura Kotte, an urban satellite city of Colombo, was designated the official legislative capital of Sri Lanka in 1982.',
    category: 'Capitals & Countries',
    difficulty: 'very_hard'
  },
  {
    id: 'vh14',
    question: 'The historic 1893 Durand Line serves as the disputed international border between which two countries?',
    options: ['India and Pakistan', 'Pakistan and Afghanistan', 'Iran and Pakistan', 'China and India'],
    correctIndex: 1,
    explanation: 'The 2,670 km Durand Line was drawn by Sir Mortimer Durand between British India and Afghanistan and is currently the border between Afghanistan and Pakistan.',
    category: 'Borders & Neighbors',
    difficulty: 'very_hard'
  },
  {
    id: 'vh15',
    question: 'What is the name of the narrow land strip in northeastern Afghanistan that extends all the way to border China?',
    options: ['Khyber Pass', 'Wakhan Corridor', 'Panjshir Valley', 'Lachin Corridor'],
    correctIndex: 1,
    explanation: 'The Wakhan Corridor is a narrow panhandle created in the 19th century as a buffer zone between the Russian Empire and British India, linking Afghanistan directly to Xinjiang, China.',
    category: 'Strategic Locations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh16',
    question: 'Where is the Secretariat of the Pacific Islands Forum (PIF) permanently located?',
    options: ['Port Moresby, Papua New Guinea', 'Suva, Fiji', 'Auckland, New Zealand', 'Honolulu, USA'],
    correctIndex: 1,
    explanation: 'The Secretariat of the Pacific Islands Forum is headquartered in Suva, Fiji, facilitating regional cooperation among Pacific Island countries.',
    category: 'International Organizations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh17',
    question: 'The Strait of Tartary separates mainland Asian Russia from which large Russian island?',
    options: ['Kuril Islands', 'Sakhalin Island', 'Kamchatka', 'Wrangel Island'],
    correctIndex: 1,
    explanation: 'The Strait of Tartary connects the Sea of Okhotsk with the Sea of Japan, separating Sakhalin Island from the Asian mainland.',
    category: 'Straits, Seas & Canals',
    difficulty: 'very_hard'
  },
  {
    id: 'vh18',
    question: 'The Orinoco River basin, one of the longest river systems in South America, lies mostly within which two countries?',
    options: ['Brazil and Colombia', 'Venezuela and Colombia', 'Guyana and Venezuela', 'Peru and Ecuador'],
    correctIndex: 1,
    explanation: 'The Orinoco River flows for over 2,140 km through Venezuela and along the border with Colombia.',
    category: 'Mountains & Rivers',
    difficulty: 'very_hard'
  },
  {
    id: 'vh19',
    question: 'Which French overseas region in South America hosts the Guiana Space Centre, Europe’s primary spaceport?',
    options: ['Guadeloupe', 'Martinique', 'French Guiana', 'Réunion'],
    correctIndex: 2,
    explanation: 'French Guiana is an overseas department of France on the northeastern coast of South America, selected for rocket launches due to its proximity to the equator.',
    category: 'Territorial Geography',
    difficulty: 'very_hard'
  },
  {
    id: 'vh20',
    question: 'The Strait of Otranto connects the Adriatic Sea to which other Mediterranean sea?',
    options: ['Tyrrhenian Sea', 'Aegean Sea', 'Ionian Sea', 'Ligurian Sea'],
    correctIndex: 2,
    explanation: 'The Strait of Otranto is a 72-km passage between southeastern Italy (Apulia) and southwestern Albania that connects the Adriatic to the Ionian Sea.',
    category: 'Strategic Locations',
    difficulty: 'very_hard'
  },
  {
    id: 'vh21',
    question: 'What is the political capital city of Côte d’Ivoire (Ivory Coast), designated in 1983 to replace Abidjan?',
    options: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'San-Pédro'],
    correctIndex: 1,
    explanation: 'Yamoussoukro became the official political capital of Côte d’Ivoire in 1983, though Abidjan remains its economic capital and largest metropolis.',
    category: 'Capitals & Countries',
    difficulty: 'very_hard'
  },
  {
    id: 'vh22',
    question: 'Under UNCLOS, how far from a nation’s baseline does its Exclusive Economic Zone (EEZ) extend?',
    options: ['12 nautical miles', '24 nautical miles', '200 nautical miles', '350 nautical miles'],
    correctIndex: 2,
    explanation: 'Under the UN Convention on the Law of the Sea (UNCLOS), a coastal state’s Exclusive Economic Zone (EEZ) extends up to 200 nautical miles (370 km) from its coastal baseline.',
    category: 'Geopolitical Regions',
    difficulty: 'very_hard'
  },
  {
    id: 'vh23',
    question: 'Which country has an autonomous exclave named Nakhchivan, geographically separated by Armenian territory?',
    options: ['Georgia', 'Azerbaijan', 'Turkey', 'Iran'],
    correctIndex: 1,
    explanation: 'Nakhchivan is a landlocked autonomous republic of Azerbaijan, bordered by Armenia, Iran, and Turkey.',
    category: 'Borders & Neighbors',
    difficulty: 'very_hard'
  },
  {
    id: 'vh24',
    question: 'The Hindu Kush mountain range extends primarily across which two countries?',
    options: ['India and Nepal', 'Pakistan and Afghanistan', 'China and Tajikistan', 'Iran and Turkmenistan'],
    correctIndex: 1,
    explanation: 'The Hindu Kush is an 800-km-long mountain range stretching through central and western Afghanistan into northern Pakistan.',
    category: 'Mountains & Rivers',
    difficulty: 'very_hard'
  },
  {
    id: 'vh25',
    question: 'Which broad body of water separates the island of Madagascar from mainland East Africa?',
    options: ['Zanzibar Channel', 'Mozambique Channel', 'Red Sea', 'Gulf of Aden'],
    correctIndex: 1,
    explanation: 'The Mozambique Channel is an arm of the Indian Ocean located between Madagascar and the southeastern African country of Mozambique.',
    category: 'Straits, Seas & Canals',
    difficulty: 'very_hard'
  },
  {
    id: 'vh26',
    question: 'What is the official capital city of Tanzania, which replaced Dar es Salaam as official capital in 1996?',
    options: ['Dar es Salaam', 'Dodoma', 'Arusha', 'Mwanza'],
    correctIndex: 1,
    explanation: 'Dodoma was designated national capital of Tanzania in 1974 and officially completed political transition from Dar es Salaam in 1996.',
    category: 'Capitals & Countries',
    difficulty: 'very_hard'
  }
];
