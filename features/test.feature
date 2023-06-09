Feature: STCTV Subscription Packages

    Scenario Outline: Validate the Subscription Packages - Type & Price and Currency for <Country>
        Given I am navigated to "https://subscribe.stctv.com/"
        When I select Country as "<Country>"
        Then I verify the currency is "<Currency>"
        And I verify the prices of each package
            | Type     | Price |
            | لايت     | <Price_1>     |
            | الأساسية | <Price_2>    |
            | بريميوم  | <Price_3>    |

Examples:
    | Country | Currency | Price_1 |Price_2|Price_3|
    | عمان | ريال عماني | 5 |10|15|
    | الإمارات | درهم إماراتي | 5.4 |10.9|16.3|
    | الأردن | دينار أردني | 2.7 |5.2|8|
