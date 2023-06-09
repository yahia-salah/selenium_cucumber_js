Feature: STCTV Subscription Packages

    Scenario: Validate the Subscription Packages - Type & Price and Currency for all Countries
        Given I am navigated to "https://subscribe.stctv.com/"
        When I select Country as "عمان"
        Then I verify the currency is "ريال عماني"
        And I verify the prices of each package
            | Type     | Price |
            | لايت     | 5     |
            | الأساسية | 10    |
            | بريميوم  | 15    |
