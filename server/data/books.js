const { Book } = require('../models/book')
//1. arr of data
// 2. link with id

const data = [
    {
        "_id": "5f38f9a579b22863c7957a79",
        "name": "Muna Madan",
        "subtitle": "Nepali Episodic Love Poem",
        "description": "Considered a classic of Nepali literature, Muna Madan remains a popular poem and is taught in schools. The plot follows Madan, newly married to Muna, who leaves for Lhasa in Tibet to make his fortune despite protests from his wife.",
        "author": "Laxmi Prasad Devkota",
        "link": "https://everestwalk-books.s3.amazonaws.com/1597569571438.json",
        "coverLink":"https://everestwalk-bookcovers.s3.amazonaws.com/1603508381909.jpeg"
    },
    {
        "_id": "5f38f9a579b22863c7957a7a",
        "name": "Siris ko Phool",
        "subtitle": "Blue Mimosa",
        "description": "Suyog meets Sakambari and her two sisters through Sivaraj. Suyog is a lonely middle-aged man and sees the three sisters with eyes of lust. He views Mujura as the quintessential woman with all the feminine virtues and the most logical choice for a wife. However, he is drawn towards Sakambari who is a rebellious personality who does not adhere to the traditional expectations of how a woman should act or dress. He finds his philosophies strongly at odds with Sakambari's and their acquaintance leads him to reevaluate his past life and actions. He comes to accept his acts such as the rape of three women he committed during the war, which he had previously rationalised as acceptable under the peril of immediate death both he and his victims were under at the time, as criminal. Suyog finds himself unable to continue without love or redemption. Reasoning that either Bari will accept him and he will have happiness or she will hurt or kill him for the transgression giving him redemption, Suyog gets hold of her and kisses her. However, Bari simply looks deeply into him and strides off, vanishing into the house. Suyog is left distraught and confused. Months after the incident, he finds out that Sakambari has died.",
        "author": "Parijat",
        "link": "https://everestwalk-books.s3.amazonaws.com/1597569571438.json",
        "coverLink":"https://everestwalk-bookcovers.s3.ap-south-1.amazonaws.com/1603508419233.jpg"
    }
]
exports.model = Book
exports.data = data