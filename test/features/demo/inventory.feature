Feature: Inventory

    
    Scenario Outline: Demo Inventory
        Given Login to inventory web app
        Then Inventory page should list <NumberOfProducts>
        Then Validate all products have valid price


        Examples:
            | TestID    | NumberOfProducts |
            | INT_TC002 | 6                |
            
