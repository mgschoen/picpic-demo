module.exports = {

    api: {
        default: {
            baseUrl: 'https://picpic-api-ci.herokuapp.com',
            routes: {
                awake: '/awake',
                picpic: '/custom/picpic/ml'
            }
        },
        netlify: {
            baseUrl: 'https://vigilant-yonath-af08cf.netlify.com',
            routes: {
                picpic: '/.netlify/functions/custom-picpic'
            }
        }
    },

    sampleText1: 'In a corruption case that has shaken Spain\'s royal family, Iñaki Urdangarin, the husband of Princess Cristina, has been told he has five days to report to a prison to start his sentence.\n\nHe will serve five years and 10 months for embezzlement, influence-peddling and tax fraud.\n\nThe princess herself was cleared of involvement in last year\'s trial.\n\nShe was the first member of the royal family to go on trial in modern Spanish history.\n\nUrdangarin becomes the first member of a Spanish monarch\'s family to go to jail.\n\nHe has five days to decide where he intends to serve his prison term.\n\nHis sentence was reduced on appeal on Tuesday by the Supreme Court from six years and three months and the case was then sent back to the original court in Majorca for a final ruling.\n\nUrdangarin, 50, was convicted last year of using his not-for-profit Nóos Institute sports foundation on the island of Majorca to siphon off millions of euros for private use.\n\nHe ran the foundation as a vehicle to win falsely inflated contracts from regional government bodies for organising sports events, before channelling the money to personal accounts via tax havens.\n\nNóos received more than €6m (£4.4m; $6.5m) of public money, mostly from the Balearic Islands and Valencia regional governments. Urdangarin will also have to pay more than €1m in fines.\n\nTwo other senior figures are also going to jail.\n\nUrdangarin\'s ex-business partner, Diego Torres, has been told he has five days to report to a prison to serve his term of five years and eight months.\n\nThe former head of the Balearic island government, Jaume Matas, who is also a former Spanish environment minister, faces a shorter sentence.\n\nSpanish media noted that Tuesday\'s jail sentence coincided with Princess Cristina\'s 53rd birthday.\n\nUrdangarin still has the right to seek a royal pardon, however King Felipe VI has tried to distance himself from the case, which overshadowed the final years of his father Juan Carlos, who abdicated in 2014.\n\nHe may also apply to the constitutional court to have his term suspended.\n\nThe couple were barred from appearing at official events from 2011 and King Felipe then stripped them of their titles of Duke and Duchess of Palma de Mallorca when he came to power.\n\nThey moved to Geneva in 2013 and Urdangarin flew in to Palma airport from Switzerland on Tuesday to hear the verdict.\n\nThe princess, who is the king\'s younger sister, was highly regarded in Spain for her role in fighting child mortality for a charitable foundation. Her husband played for Spain\'s handball team at the 1996 Olympics.\n\nThey married in 1997 and have four children.\n\nWhile Cristina was absolved of any guilt in the corruption trial, she had been on the board of the Nóos Institute and was given a fine for unwittingly benefiting from illegal gains.',
    sampleText2: 'Hacking \'hero\' Marcus Hutchins faces more malware charges\n\nA British cyber-security researcher credited with stopping the spread of the WannaCry virus faces four more charges related to separate malware he is alleged to have created.\n\nMarcus Hutchins, who denies the charges, has asked his Twitter followers to help with his legal fees.\n\nMr Hutchins was arrested at Las Vegas airport in August last year after he left the Black Hat conference.\n\nHe was accused of creating a piece of malware known as Kronos.\n\nKronos was designed to steal banking credentials.\n\nAccording to a new court filing, Mr Hutchins is now also accused of creating a second piece of malware, known as UPAS Kit.\n\nHe is also accused of distributing it with the help of another person.\n\nAccording to the court document, the malware was created in 2012 to be installed silently and not alert anti-virus software. It is alleged to have collected personal information.\n\nMr Hutchins\'s lawyer, Brian Klein, described the new indictment as "meritless".\n\nThe cyber-security researcher is originally from Ilfracombe, Devon, and works for LA-based company Kryptos Logic.\n\nHe shot to fame after helping to stall the WannaCry ransomware cyber-attack that struck the NHS and other organisations in May 2017.\n\nThe cyber-attack targeted 150 countries and locked down computers, demanding a $300 (£223) fee to restore files.\n\nMr Hutchins was granted bail on 5 August after $30,000 (£23,000) was raised by friends and family.',
    sampleText3: 'Chef Atul Kocchar sacked for Priyanka Chopra terrorism tweet\n\nMichelin-starred chef Atul Kocchar has been fired for a tweet claiming Muslims have "terrorised" Hindus for thousands of years.\n\nThe JW Marriott Marquis Hotel in Dubai dropped the chef after he posted the comments, aimed at Indian actress Priyanka Chopra.\n\nMs Chopra has come under fire for a recent episode of her US TV show Quantico, featuring a plot about Hindu nationalists.\n\nThe chef has apologised for the tweet.\n\nIn full, Mr Kocchar tweeted on Sunday: "It\'s sad to see that you [Chopra] have not respected the sentiments of Hindus who have been terrorized by Islam over 2000 years. Shame on You."\n\nHe has since deleted the message, and posted an apology saying his previous comments were "insensitive and wrong".\n\nThe JW Marriott Marquis Hotel fired the chef on Wednesday, after threats online to boycott the establishment for Mr Kocchar\'s comments.\n\n"We pride ourselves on creating a culture of diversity and inclusion for our guests and associates across the hotel and our restaurants," a spokesperson said.\n\nMr Kocchar has described the decision as "deeply upsetting" but said he fully accepted "the great pain I have caused and the difficult position the hotel has been put in".\n\nThe chef became the second Indian to earn a Michelin star in 2007 for his Benares restaurant in London.\n\nHis tweet is part of a wave of online criticism directed at Priyanka Chopra, an Indian-born, US-based actress.\n\nMs Chopra plays the lead character Alex Parrish in spy thriller Quantico, which broadcast an episode on 1 June showing the character foiling a terror attack in New York.\n\nThough the fictitious attack was ostensibly planned by Pakistanis ahead of a summit about Kashmir, the disputed territory claimed by India and Pakistan, Ms Chopra\'s character discovers it is in fact Hindu nationalists trying to frame the Pakistanis.\n\nThere was fury online after the episode aired, with some declaring Ms Chopra "an insult to India" and the episode an attack on Hindus.\n\nMs Chopra has since apologised, declaring herself "a proud Indian".\n\nI’m extremely saddened and sorry that some sentiments have been hurt by a recent episode of Quantico. That was not and would never be my intention. I sincerely apologise. I\'m a proud Indian and that will never change.',

    statusLabels: {
        busy: 'Launching...',
        error: 'Not available',
        healthy: 'Ready'
    },

    tracking: {
        baseUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScSNW2s62mFgwCpajlXNCktSwy-Fyn8I-tW8V_m01h0PSma7g/formResponse',
        globalKeys: {
            requestHash: 'picpic_request_hash',
            sessionID: 'picpic_session_id'
        },
        keys: {
            requestHash: 'entry.2084126920',
            sessionID: 'entry.1403945760',
            actionType: 'entry.225918472',
            actionContent: 'entry.428068187',
            actionContentAppendix: 'entry.2011657705'
        },
        validActionTypes: ['receiveImages', 'submitText', 'clickImage']
    },
    
    validViews: ['input', 'output']
}
