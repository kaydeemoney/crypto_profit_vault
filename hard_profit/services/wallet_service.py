from engineroom import db, CryptoWallet


def get_wallet(user_id):
    return CryptoWallet.query.filter_by(user_id=user_id).first()


def credit_wallet(wallet, amount):
    wallet.total_balance_usd = float(wallet.total_balance_usd or 0) + float(amount)
    wallet.withdrawable_balance = float(wallet.withdrawable_balance or 0) + float(amount)


def debit_wallet(wallet, amount):
    wallet.total_balance_usd = float(wallet.total_balance_usd or 0) - float(amount)
    wallet.withdrawable_balance = float(wallet.withdrawable_balance or 0) - float(amount)
