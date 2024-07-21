balance = 0
prev_trans = []

def check_balance():
    global balance
    print(f"Your Balance is: {balance}")
    print("-------------------------------------------------------------------------------------------------")

def deposit():
    global balance
    global prev_trans
    try:
        deposit_amount = int(input("Enter the Amount to Deposit: "))
        if deposit_amount > 0:
            balance += deposit_amount
            prev_trans = ["deposit", deposit_amount]
            print(f"{deposit_amount} credited to your account.")
        else:
            print("Deposit amount must be positive.")
    except ValueError:
        print("Invalid amount. Please enter a numeric value.")
    print("-------------------------------------------------------------------------------------------------")

def withdraw():
    global balance
    global prev_trans
    try:
        withdraw_amount = int(input("Enter the Amount to Withdraw: "))
        if withdraw_amount > 0:
            if withdraw_amount <= balance:
                balance -= withdraw_amount
                prev_trans = ["withdraw", withdraw_amount]
                print(f"{withdraw_amount} debited from your account.")
            else:
                print("Insufficient balance.")
        else:
            print("Withdrawal amount must be positive.")
    except ValueError:
        print("Invalid amount. Please enter a numeric value.")
    print("-------------------------------------------------------------------------------------------------")

def previous_transaction():
    global prev_trans
    if not prev_trans:
        print("No transactions have occurred yet.")
    else:
        trans_type, amount = prev_trans
        if trans_type == "deposit":
            print(f"Previous transaction: Deposit {amount}")
        elif trans_type == "withdraw":
            print(f"Previous transaction: Withdraw {amount}")
    print("-------------------------------------------------------------------------------------------------")

def exit_program():
    print("You have exited.")
    print("Thank you for choosing our bank.")
    print("-------------------------------------------------------------------------------------------------")

def user_choosing():
    while True:
        print("1. Check Balance")
        print("2. Deposit Amount")
        print("3. Withdraw Amount")
        print("4. Previous Transaction")
        print("5. Exit")
        try:
            options_input = int(input("What do you want to do? "))
            if options_input == 1:
                check_balance()
            elif options_input == 2:
                deposit()
            elif options_input == 3:
                withdraw()
            elif options_input == 4:
                previous_transaction()
            elif options_input == 5:
                exit_program()
                break
            else:
                print("Enter a valid option.")
        except ValueError:
            print("Invalid option. Please enter a number between 1 and 5.")
        print("-------------------------------------------------------------------------------------------------")

while True:
    customer_name = input("Enter Your Name: ").strip()
    if customer_name.isalpha():
        break
    else:
        print("Invalid name. Please enter only alphabets.")

while True:
    try:
        account_number = int(input("Enter Your Account Number: "))
        break
    except ValueError:
        print("Invalid Account Number. Please enter a valid numeric account number.")

print("-------------------------------------------------------------------------------------------------")
print(f"Welcome {customer_name}")
print(f"Your Account Number is {account_number}")
print("-------------------------------------------------------------------------------------------------")

user_choosing()
