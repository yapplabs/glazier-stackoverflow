Glazier StackOverflow questions card
====================================

## Adding to glazier

    # in `glazier/cards/`
    ln -s your/path/to/glazier-stackoverflow/cards/questions stackoverflow-questions

    # in `glazier/`
    grunt ingestCards

    # in `glazier/glazier-server/`
    bundle exec rails console

    # add the Pane to the dashboard of your choosing
    db = Dashboard.where(repository: 'emberjs/ember.js').first
    db.add_pane('yapplabs/stackoverflow-questions')
    
    # make sure to also install the stackoverflow-auth card
