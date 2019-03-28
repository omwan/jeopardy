import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import api from '../api';

export default function Board(props) {
  // expects board array of this structure (matches that on the server, but will have parts obfuscated)
  // TODO replace with actual data
  const dummy_board = [
    {
      "a pageant of royalty": {
        "1000": {
          answer: "Beatrix",
          question: "In 1966, she, then a Dutch princess, decided to Potter around the house with Klauss Von Amsberg"
        },
        "200": {
          answer: "Isabella",
          question: "Henry IV of Castile wanted her to marry the king of Portugal, but she wed Ferdinand in 1469"
        },
        "400": {
          answer: "Grace Kelly",
          question: "Her 26-year marriage to Prince Rainier III ended with her death in 1982"
        },
        "600": {
          answer: "Cleopatra",
          question: "She had a Caesar on the side while she was married to her brother Ptolemy XIV"
        },
        "800": {
          answer: "Eleanor", 
          question: "In 1137 she was but a teenager, & not only did she inherit Aquitaine but also wed the future king of France!"
        }
      }
    },
    {
      "happy holiday!": {
        "1000": {
          answer: "Flag Day",
          question: "\"Pause for the Pledge of Allegiance\" is a part of this U.S. holiday's ceremonies"
        },
        "200": {
          answer: "Martin Luther King Day",
          question: "In 2013 this federal holiday was also Inauguration Day"
        },
        "400": {
          answer: "Constitution Day",
          question: "In North Korea, Dec. 27 is this document's day--North Carolina's could be Nov. 21, 1789"
        },
        "600": {
          answer: "the Dominican Republic",
          question: "Jan. 26 is Duarte's birthday in this country, honoring Juan Duarte, a leader in its fight for freedom from Haiti"
        },
        "800": {
          answer: "Egypt",
          question: "In this country October 24 is Popular Resistance Day as well as Suez National Day"
        }
      }
    },
    {
      "literature": {
        "1000": {
          answer: "Charles Dickens",
          question: "This author said that he was acting in a play with his kids when he came up with the idea for \"A Tale of Two Cities\""
        }, 
        "200": {
          answer: "<i>Moby Dick</i>",
          question: "2 old Quakers, Captain Peleg & Captain Bildad, are part-owners of the Pequod in this 1851 novel"
        },
        "400": {
          answer: "<i>Crime & Punishment</i>",
          question: "Inspector Porfiry Petrovich is on the case in this 1866 novel"
        },
        "600": {
          answer: "<i>The House of the Spirits</i>",
          question: "It's the English title of Isabel Allende's novel \"La Casa de los Espiritus\""
        },
        "800": {
          answer: "<i>The Good Earth</i>",
          question: "In 1932 this Pearl Buck novel was dramatized by Owen & Donald Davis"
        }
      }
    },
    {
      "u.s. franchises": {
        "1000": {
          answer: "Hampton Inn",
          question: "Hilton doesn't own Holiday Inn but does own this other \"H\" \"Inn\""
        },
        "200": {
          answer: "McDonald\\'s",
          question: "The Filet-O-Fish is one of its offerings"
        },
        "400": {
          answer: "Supercuts",
          question: "Regis Corporation franchises this \"Super\" salon chain that gives 33 million clips a year"
        },
        "600": {
          answer: "Subway",
          question: "The sandwich generation loves this chain, now tops in number of U.S. restaurants"
        },
        "800": {
          answer: "AM-PM",
          question: "Out west you'll find this convenience store at Arco stations, morning or night"
        }
      }
    },
    {
      "historic tv": {
        "1000": {
          answer: "Bill Cosby",
          question: "\"I Spy\" made the TV history books in 1965 when it cast this African American in one of the lead roles"
        },
        "200": {
          answer: "<i>Roots</i>",
          question: "This '70s miniseries scored a monster 71 of viewers for its finale & boosted interest in genealogy"
        },
        "400": {
          answer: "<i>The Real World</i>",
          question: "Before \"Survivor\" & \"Big Brother\", this MTV show took television into a house where 7 young people lived together"
        },
        "600": {
          answer: "<i>All In The Family</i>", 
          question: "This Norman Lear sitcom that began in 1971 dealt with controversial topics regularly"
        },
        "800": {
          answer: "(David) Brinkley",
          question: "In 1956 NBC paired Chet Huntley & this future \"This Week With...\" host on an innovative newscast"
        }
      }
    },
    {
      "\"o\" yes": {
        "1000": {
          answer: "an oratory",
          question: "Not just the art of speaking, it can also be a place of prayer, like the one seen here"
        },
        "200": {
          answer: "an ounce",
          question: "You don't need to be a wizard to know oz. is short for this measure"
        },
        "400": {
          answer: "once",
          question: "In Madrid, it follows nueve, diez..."
        },
        "600": {
          answer: "the ocarina",
          question: "It's egg-shaped & sounds like so"
        },
        "800": {answer: "an oligarchy", question: "Government by the few"}
      }
    }
  ];

  return <div className="board">
    {_.map(dummy_board, (c, idx) => <Category key={idx} category={c} />)}
  </div>;
}

function Category(props) {
  let name = Object.keys(props.category)[0];
  let point_values = _.map(Object.keys(props.category[name]), (val) => parseInt(val));

  return <div className="category">
    <div className="title-card card">{name}</div>
    {_.map(point_values, (points, idx) => <Card key={idx} category={name} points={points} c/>)}
  </div>
}

Category.propTypes = {
  category: PropTypes.object
};

function Card(props) {
  return <div className="question-card card" onClick={() => api.getQuestion(props.category, props.points)}>{props.points}</div>;
}

Card.propTypes = {
  category: PropTypes.string,
  points: PropTypes.number
};