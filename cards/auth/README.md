Glazier StackOverflow auth card
===============================

## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-stackoverflow/cards/auth stackoverflow-auth

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # add the Pane to the dashboard of your choosing
    db = Dashboard.where(repository: 'emberjs/ember.js').first
    db.add_pane('glazier-stackoverflow-auth')
